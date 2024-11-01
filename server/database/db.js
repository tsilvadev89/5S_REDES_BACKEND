const mariadb = require('mariadb');
require('dotenv').config();

/* // Pool de conexões
const pool = mariadb.createPool({
  host: process.env.DB_HOST,       // Host do MariaDB
  user: process.env.DB_USER,       // Usuário do banco
  password: process.env.DB_PASSWORD, // Senha
  database: process.env.DB_NAME,   // Nome do banco de dados
  connectionLimit: 5               // Limite de conexões simultâneas
}); */


// Pool de conexões
const pool = mariadb.createPool({
  host: 'localhost',                // Host do MariaDB
  user: 'fatec',                    // Usuário do banco
  password: 'fatec',                // Senha
  database: 'salao_beleza',         // Nome do banco de dados
  connectionLimit: 5                // Limite de conexões simultâneas
});


module.exports = pool;
