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
    host: process.env.DB_MDB_HOST,
    user: process.env.DB_MDB_USER,
    password: process.env.DB_MDB_PASSWORD,
    database: process.env.DB_MDB_NAME,
    dialect: 'mariadb',
    port: process.env.DB_MDB_PORT,
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
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_NAME,
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    port: process.env.PORT_LOCAL,
    dialectOptions: {
      allowPublicKeyRetrieval: true,
      connectTimeout: parseInt(process.env.DB_LOCAL_CONNECTTIMEOUT || 10000),
    },
  };
}

// Função para garantir que o banco de dados exista
async function ensureDatabaseExists() {
  let connection;
  console.log(dbConfig);

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
      // Criação do banco de dados caso não exista
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

      // Verificação da variável de ambiente para recriar o banco
      if (process.env.DROP_AND_RECREATE === 'true') {
        const dropDBQuery = `DROP DATABASE ${dbConfig.database}`;
        const createDBQuery = `CREATE DATABASE ${dbConfig.database}`;

        if (dbConfig.dialect === 'mariadb') {
          await connection.query(dropDBQuery);
          console.log(`Banco de dados "${dbConfig.database}" deletado.`);
          await connection.query(createDBQuery);
          console.log(`Banco de dados "${dbConfig.database}" recriado.`);
        } else {
          await new Promise((resolve, reject) => {
            connection.query(dropDBQuery, (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
          console.log(`Banco de dados "${dbConfig.database}" deletado.`);
          await new Promise((resolve, reject) => {
            connection.query(createDBQuery, (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
          console.log(`Banco de dados "${dbConfig.database}" recriado.`);
        }
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
    max: 5,           // Número máximo de conexões simultâneas
    min: 0,           // Número mínimo de conexões
    acquire: 30000,   // Tempo máximo (ms) para tentar uma conexão antes de lançar erro
    idle: 10000,      // Tempo (ms) que a conexão pode ficar ociosa antes de ser encerrada
  },
  dialectOptions: dbConfig.dialectOptions,
});

module.exports = { sequelize, ensureDatabaseExists };
