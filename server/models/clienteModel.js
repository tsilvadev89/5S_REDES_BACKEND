const pool = require('../database/db');

async function createCliente({ primeiro_nome, sobrenome, email, data_nascimento }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "INSERT INTO clientes (primeiro_nome, sobrenome, email, data_nascimento) VALUES (?, ?, ?, ?)",
      [primeiro_nome, sobrenome, email, data_nascimento]
    );
    return { id: result.insertId, primeiro_nome, sobrenome, email };
  } finally {
    if (conn) conn.release();
  }
}

async function getClientes() {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM clientes");
    return result;
  } finally {
    if (conn) conn.release();
  }
}

async function getClienteById(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM clientes WHERE cliente_id = ?", [id]);
    return result[0];
  } finally {
    if (conn) conn.release();
  }
}

async function updateCliente(id, { primeiro_nome, sobrenome, email, data_nascimento }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE clientes SET primeiro_nome = ?, sobrenome = ?, email = ?, data_nascimento = ? WHERE cliente_id = ?",
      [primeiro_nome, sobrenome, email, data_nascimento, id]
    );
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

async function deleteCliente(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("DELETE FROM clientes WHERE cliente_id = ?", [id]);
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente
};
