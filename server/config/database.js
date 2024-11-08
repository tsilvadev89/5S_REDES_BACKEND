// config/database.js
const { Sequelize } = require('sequelize');
const mariadb = require('mariadb');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'fatec',
  password: process.env.DB_PASSWORD || 'fatec',
  database: process.env.DB_NAME || 'salao_beleza',
  dialect: 'mariadb',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// Função para garantir que o banco de dados exista
async function ensureDatabaseExists() {
  const connection = await mariadb.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  try {
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbConfig.database}'`) || [];
    if (!rows || rows.length === 0) {
      await connection.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log(`Banco de dados "${dbConfig.database}" criado com sucesso.`);
    } else {
      console.log(`Banco de dados "${dbConfig.database}" já existe.`);
    }
  } catch (error) {
    console.error('Erro ao verificar ou criar o banco de dados:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: dbConfig.pool,
});

module.exports = { sequelize, ensureDatabaseExists };
