const pool = require('../database/db');

async function createServico({ nome, descricao, preco, duracao }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "INSERT INTO servicos (nome, descricao, preco, duracao) VALUES (?, ?, ?, ?)",
      [nome, descricao, preco, duracao]
    );
    return { id: result.insertId, nome, descricao, preco, duracao };
  } finally {
    if (conn) conn.release();
  }
}

async function getServicos() {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM servicos");
    return result;
  } finally {
    if (conn) conn.release();
  }
}

async function getServicoById(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM servicos WHERE servico_id = ?", [id]);
    return result[0];
  } finally {
    if (conn) conn.release();
  }
}

async function updateServico(id, { nome, descricao, preco, duracao }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE servicos SET nome = ?, descricao = ?, preco = ?, duracao = ? WHERE servico_id = ?",
      [nome, descricao, preco, duracao, id]
    );
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

async function deleteServico(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("DELETE FROM servicos WHERE servico_id = ?", [id]);
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  createServico,
  getServicos,
  getServicoById,
  updateServico,
  deleteServico
};
