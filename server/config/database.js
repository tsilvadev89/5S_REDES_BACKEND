// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME || 'salao_beleza', process.env.DB_USER || 'fatec', process.env.DB_PASSWORD || 'fatec', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mariadb', 
  logging: false, 
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    bigNumberStrings: true, 
  },
});

module.exports = sequelize;
