import Database from 'better-sqlite3';
import { NextResponse } from 'next/server';

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
        const { name, email } = await req.json();

        // Insertar un nuevo usuario en la base de datos
        const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
        const info = stmt.run(name, email);

        // Retornar el ID del nuevo usuario creado
        return NextResponse.json({ id: info.lastInsertRowid, name, email });
    } catch (error) {
        return NextResponse.json({ error: 'Error inserting user: ' + error.message }, { status: 500 });
    }
}
