import Database from 'better-sqlite3';
import {NextResponse} from 'next/server';

// Conectar a la base de datos SQLite
const db = new Database('mydatabase.db');

// Crear la tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

// API para manejar solicitudes GET y POST
export async function GET() {
    // Ejecutar una consulta para obtener todos los usuarios
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();

    return NextResponse.json(users);
}

export async function POST(req) {
    try {
        const {name, email} = await req.json();

        // Insertar un nuevo usuario en la base de datos
        const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
        const info = stmt.run(name, email);

        // Retornar el ID del nuevo usuario creado
        return NextResponse.json({id: info.lastInsertRowid, name, email});
    } catch (error) {
        return NextResponse.json({error: 'Error inserting user: ' + error.message}, {status: 500});
    }
}

export async function GET_id(req) {
    const {id} = req.params;

    // Ejecutar una consulta para obtener el usuario con el ID especificado
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id);

    if (user) {
        return NextResponse.json(user);
    } else {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }
}

export async function PUT_id(req) {
    const {id} = req.params;
    const {name, email} = await req.json();

    // Actualizar el usuario con el ID especificado
    const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
    const info = stmt.run(name, email, id);

    if (info.changes) {
        return NextResponse.json({id, name, email});
    } else {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }
}

export async function DELETE_id(req) {
    const {id} = req.params;

    // Eliminar el usuario con el ID especificado
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes) {
        return NextResponse.json({id});
    } else {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }
}

