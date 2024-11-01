const pool = require('../database/db');

async function createFuncionario({ primeiro_nome, sobrenome, email, cargo_id, data_contratacao }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "INSERT INTO funcionarios (primeiro_nome, sobrenome, email, cargo_id, data_contratacao) VALUES (?, ?, ?, ?, ?)",
      [primeiro_nome, sobrenome, email, cargo_id, data_contratacao]
    );
    return { id: result.insertId, primeiro_nome, sobrenome, email };
  } finally {
    if (conn) conn.release();
  }
}

async function getFuncionarios() {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM funcionarios");
    return result;
  } finally {
    if (conn) conn.release();
  }
}

async function getFuncionarioById(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM funcionarios WHERE funcionario_id = ?", [id]);
    return result[0];
  } finally {
    if (conn) conn.release();
  }
}

async function updateFuncionario(id, { primeiro_nome, sobrenome, email, cargo_id, data_contratacao }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE funcionarios SET primeiro_nome = ?, sobrenome = ?, email = ?, cargo_id = ?, data_contratacao = ? WHERE funcionario_id = ?",
      [primeiro_nome, sobrenome, email, cargo_id, data_contratacao, id]
    );
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

async function deleteFuncionario(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("DELETE FROM funcionarios WHERE funcionario_id = ?", [id]);
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  createFuncionario,
  getFuncionarios,
  getFuncionarioById,
  updateFuncionario,
  deleteFuncionario
};
