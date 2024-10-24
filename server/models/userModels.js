const pool = require('../database/db');

// Função para criar um novo usuário
async function createUser({ nome, email, senha }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    return result;
  } finally {
    if (conn) conn.end();
  }
}

// Função para buscar todos os usuários
async function getUsers() {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM usuarios");
    return result;
  } finally {
    if (conn) conn.end();
  }
}

// Função para buscar usuário por ID
async function getUserById(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return result[0];
  } finally {
    if (conn) conn.end();
  }
}

// Função para atualizar um usuário
async function updateUser(id, { nome, email, senha }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [nome, email, senha, id]
    );
    return result;
  } finally {
    if (conn) conn.end();
  }
}

// Função para excluir um usuário
async function deleteUser(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
