const pool = require('../database/db');

async function createCategoria({ nome, descricao, imagem_url }) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO categorias (nome, descricao, imagem_url) VALUES (?, ?, ?)",
      [nome, descricao, imagem_url]
    );
    return { id: result.insertId, nome, descricao, imagem_url };
  } finally {
    if (conn) conn.release();
  }
}

async function getCategorias() {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query("SELECT * FROM categorias");
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function getCategoriaById(id) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query("SELECT * FROM categorias WHERE categoria_id = ?", [id]);
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function updateCategoria(id, { nome, descricao, imagem_url }) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "UPDATE categorias SET nome = ?, descricao = ?, imagem_url = ? WHERE categoria_id = ?",
      [nome, descricao, imagem_url, id]
    );
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

async function deleteCategoria(id) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query("DELETE FROM categorias WHERE categoria_id = ?", [id]);
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  createCategoria,
  getCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
};
