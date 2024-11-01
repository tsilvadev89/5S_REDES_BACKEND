const pool = require('../database/db');

async function createProduto({ nome, descricao, preco, estoque, categoria_id }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id) VALUES (?, ?, ?, ?, ?)",
      [nome, descricao, preco, estoque, categoria_id]
    );
    return { id: result.insertId, nome, descricao, preco, estoque };
  } finally {
    if (conn) conn.release();
  }
}

async function getProdutos() {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM produtos");
    return result;
  } finally {
    if (conn) conn.release();
  }
}

async function getProdutoById(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    return result[0];
  } finally {
    if (conn) conn.release();
  }
}

async function updateProduto(id, { nome, descricao, preco, estoque, categoria_id }) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria_id = ? WHERE produto_id = ?",
      [nome, descricao, preco, estoque, categoria_id, id]
    );
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

async function deleteProduto(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query("DELETE FROM produtos WHERE produto_id = ?", [id]);
    return result.affectedRows > 0;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  createProduto,
  getProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto
};
