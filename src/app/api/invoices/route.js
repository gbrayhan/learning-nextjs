
import Database from 'better-sqlite3';
import { NextResponse } from 'next/server';

// Conectar a la base de datos SQLite
const db = new Database('mydatabase.db');


// Crear la tabla de facturas si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER NOT NULL,
    amount DECIMAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES users(id)
  )
`);


export async function POST(req) {
    try {
        const { customerId, amount, status } = await req.json();

        const errors = await validatePOST(req);
        if (errors.length) {
            return NextResponse.json({ errors }, { status: 400 });
        }


        // Insertar una nueva factura en la base de datos
        const stmt = db.prepare('INSERT INTO invoices (customerId, amount, status) VALUES (?, ?, ?)');
        const info = stmt.run(customerId, amount, status);

        // Retornar el ID de la nueva factura creada
        return NextResponse.json({ id: info.lastInsertRowid, customerId, amount, status });
    } catch (error) {
        return NextResponse.json({ error: 'Error inserting invoice: ' + error.message }, { status: 500 });
    }
}

async function validatePOST(req) {
    // return array of errors
    const errors = [];
    const { customerId, amount, status } = await req.json();

    if (!customerId) {
        errors.push('customerId is required');
    }
    if (!amount) {
        errors.push('amount is required');
    }
    if (!status) {
        errors.push('status is required');
    }

    // validate customerId
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(customerId);
    if (!user) {
        errors.push('customerId is invalid');
    }


    return errors;
}

export async function GET() {
    // Ejecutar una consulta para obtener todas las facturas
    const stmt = db.prepare('SELECT * FROM invoices');
    const invoices = stmt.all();

    return NextResponse.json(invoices);
}

export async function GET_id(req) {
    const { id } = req.params;

    // Ejecutar una consulta para obtener la factura con el ID especificado
    const stmt = db.prepare('SELECT * FROM invoices WHERE id = ?');
    const invoice = stmt.get(id);

    if (invoice) {
        return NextResponse.json(invoice);
    } else {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
}

export async function PUT_id(req) {
    const { id } = req.params;
    const { customerId, amount, status } = await req.json();

    // Actualizar la factura con el ID especificado
    const stmt = db.prepare('UPDATE invoices SET customerId = ?, amount = ?, status = ? WHERE id = ?');
    const info = stmt.run(customerId, amount, status, id);

    if (info.changes) {
        return NextResponse.json({ id, customerId, amount, status });
    } else {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
}

export async function DELETE_id(req) {
    const { id } = req.params;

    // Eliminar la factura con el ID especificado
    const stmt = db.prepare('DELETE FROM invoices WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes) {
        return NextResponse.json({ id });
    } else {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
}


