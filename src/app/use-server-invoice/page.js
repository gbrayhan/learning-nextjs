"use client";
import {useEffect, useState} from 'react';
import {createInvoice} from '@/server-actions/create-invoice';
import {useNavigationInterceptor} from "@/hooks/useNavigationInterceptor";
import {useRouter} from "next/navigation"; // Ajusta la ruta de importación según tu estructura

export default function Page() {
    const [invoices, setInvoices] = useState([]);

    const [isDirty, setIsDirty] = useState(false);
    const router = useRouter();

    useNavigationInterceptor(isDirty);


    async function loadInvoices() {
        const response = await fetch('/api/invoices');
        if (response.ok) {
            const data = await response.json();
            setInvoices(data);
        } else {
            console.error('Failed to fetch invoices');
        }
    }

    useEffect(() => {
        loadInvoices().then(r => r);
    }, []);

    return (<div>
        <button onClick={() => {
            router.push('/');
        }}> go to home </button>

        <h1>Invoices</h1>
        <form onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            try {
                const result = await createInvoice(formData); // Pasamos fetch para que sea utilizable en el servidor
                console.log('Invoice created', result);
                alert('Invoice successfully created!');
                await loadInvoices(); // Actualizar la lista después de crear una nueva factura
            } catch (error) {
                console.error('Error creating invoice', error);
                alert('Failed to create invoice. Please try again.');
            }
            setIsDirty(false);
        }}>
            <input type="text"
                   onChange={() => {
                       setIsDirty(true);
                   }} name="customerId"
                   placeholder="Customer ID"
                   required/>
            <input type="number"
                   onChange={() => {
                       setIsDirty(true);
                   }}
                   name="amount"
                   placeholder="Amount"
                   required/>
            <input type="text"
                   onChange={() => {
                       setIsDirty(true);
                   }}
                   name="status"
                   placeholder="Status"
                   required/>
            <button type="submit">Create Invoice</button>
        </form>

        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {invoices.map((invoice) => (<tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.customerId}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
            </tr>))}
            </tbody>
        </table>
    </div>);
}
