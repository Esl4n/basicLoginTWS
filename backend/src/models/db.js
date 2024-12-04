// const mysql = require('mysql');
require('dotenv').config();

// const db = mysql.createConnection({
//     host:process.env.HOST_DB || "localhost",
//     user:process.env.USER_DB || "root",
//     password:process.env.PASSWORD_DB,
//     database:process.env.DATABASE_DB,
// });


// module.exports = db;


const { Pool } = require('pg');

// Configuración de la conexión
const db = new Pool({
  user: process.env.USER_DB || "postgres",       // Usuario de PostgreSQL
  host:  process.env.HOST_DB || "localhost",        // Dirección del servidor PostgreSQL
  database: process.env.DATABASE_DB, // Nombre de la base de datos
  password: process.env.PASSWORD_DB, // Contraseña del usuario
  port: 5432,               // Puerto de PostgreSQL (por defecto es 5432)
});

// Verificar la conexión
db.connect()
  .then(client => {
    console.log("Conexión exitosa a la base de datos.");
    client.release(); // Libera el cliente después de probar la conexión
  })
  .catch(err => console.error("Error al conectar a la base de datos:", err));

module.exports = db;
