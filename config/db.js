const { Sequelize } = require('sequelize');

// Configuración de la conexión
const db = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Dirección del host
    dialect: 'mysql', // Tipo de base de datos (en este caso MySQL)
    logging: false, // Puedes habilitar esto para ver las consultas SQL en consola
  }
);

module.exports = db;
