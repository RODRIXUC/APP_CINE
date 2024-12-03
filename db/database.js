import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del path de la base de datos
const dbPath = path.join(__dirname, 'cine.db');

// Crear la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear tablas si no existen
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            genre TEXT NOT NULL,
            duration INTEGER NOT NULL,
            rating TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            capacity INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movie_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            date_time TEXT NOT NULL,
            FOREIGN KEY (movie_id) REFERENCES movies(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER NOT NULL,
            schedule_id INTEGER NOT NULL,
            seat_number TEXT NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (schedule_id) REFERENCES schedules(id)
        )
    `);
    
});

// Exportar el objeto `db` para usarlo en otros módulos
export default db;
