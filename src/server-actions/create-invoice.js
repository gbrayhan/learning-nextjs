// create-invoice.js
'use server';


export async function createInvoice(formData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    };

    const response = await fetch('http://localhost:3000/api/invoices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
        throw new Error('Failed to create invoice');
    }

    return response.json();
}


