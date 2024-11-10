// config/database.js
const { Sequelize } = require('sequelize');
const mariadb = require('mariadb');
const mysql = require('mysql2');
require('dotenv').config({ path: './dotenv.env' });

// Configuração do banco de dados com base na variável de ambiente SETDB
let dbConfig;
console.log(process.env.SETDB);

if (process.env.SETDB === 'MYSQL') {

  dbConfig = {
    host: process.env.DB_MSQL_HOST,
    user: process.env.DB_MSQL_USER,
    password: process.env.DB_MSQL_PASSWORD,
    database: process.env.DB_MSQL_NAME,
    dialect: 'mysql',
    port: process.env.PORT_MSQL,
    dialectOptions: {
      allowPublicKeyRetrieval: true,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
} else if (process.env.SETDB === 'MARIADB') {
  dbConfig = {
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
} else {
  // Configuração padrão para MariaDB Local
  dbConfig = {
    host: process.env.DB_LOCAL_HOST || 'localhost',
    user: process.env.DB_LOCAL_USER || 'root',
    password: process.env.DB_LOCAL_PASSWORD || 'localpassword',
    database: process.env.DB_LOCAL_NAME || 'redes_local',
    dialect: 'mariadb',
    port: process.env.PORT_LOCAL || 3306,
    dialectOptions: {
      allowPublicKeyRetrieval: true,
    },
  };
}

// Função para garantir que o banco de dados exista
async function ensureDatabaseExists() {
  let connection;

  try {
    if (dbConfig.dialect === 'mariadb') {
      connection = await mariadb.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        port: dbConfig.port,
        allowPublicKeyRetrieval: true,
      });
    } else {
      // Conexão com MySQL usando mysql2
      connection = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        port: dbConfig.port,
      });

      connection.connect((err) => {
        if (err) {
          console.error('Erro ao conectar ao MySQL:', err.message);
          return;
        }
        console.log('Conexão bem-sucedida ao MySQL!');
      });
    }

    const query = `SHOW DATABASES LIKE '${dbConfig.database}'`;
    const [rows] = dbConfig.dialect === 'mariadb'
      ? await connection.query(query)
      : await new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });

    if (!rows || rows.length === 0) {
      const createDBQuery = `CREATE DATABASE ${dbConfig.database}`;
      if (dbConfig.dialect === 'mariadb') {
        await connection.query(createDBQuery);
      } else {
        await new Promise((resolve, reject) => {
          connection.query(createDBQuery, (error, results) => {
            if (error) reject(error);
            else resolve(results);
          });
        });
      }
      console.log(`Banco de dados "${dbConfig.database}" criado com sucesso.`);
    } else {
      console.log(`Banco de dados "${dbConfig.database}" já existe.`);
      const dropDBQuery = `DROP DATABASE ${dbConfig.database}`;
      if (dbConfig.dialect === 'mariadb') {
        await connection.query(dropDBQuery);
        console.log(`Banco de dados "${dbConfig.database}" DELETADO.`);
      }

      const createDBQuery = `CREATE DATABASE ${dbConfig.database}`;
      if (dbConfig.dialect === 'mariadb') {
        await connection.query(createDBQuery);
        console.log(`Banco de dados "${dbConfig.database}" RECRIADO.`);
      }
    }
  } catch (error) {
    console.error('Erro ao verificar ou criar o banco de dados:', error);
    throw error;
  } finally {
    if (connection) {
      if (dbConfig.dialect === 'mariadb') {
        await connection.end();
      } else {
        connection.end();
      }
    }
  }
}

// Configuração do Sequelize com base na seleção de banco de dados
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: dbConfig.dialectOptions,
});

module.exports = { sequelize, ensureDatabaseExists };
