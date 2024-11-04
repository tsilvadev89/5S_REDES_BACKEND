const pool = require('../database/db');

// Função para criar um novo pedido, incluindo os itens do pedido
async function createPedido({ cliente_id, valor_total, itens }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      'INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)',
      [cliente_id, valor_total]
    );

    const pedido_id = result.insertId;

    // Inserir itens do pedido
    for (const item of itens) {
      await conn.query(
        'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
        [pedido_id, item.produto_id, item.quantidade, item.preco_unitario]
      );
    }

    await conn.commit();
    return { pedido_id };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    if (conn) conn.end();
  }
}

// Função para buscar todos os pedidos
async function getPedidos() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM pedidos');
    return rows;
  } finally {
    if (conn) conn.end();
  }
}

// Função para buscar um pedido por ID
async function getPedidoById(id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM pedidos WHERE pedido_id = ?', [id]);
    return rows[0];
  } finally {
    if (conn) conn.end();
  }
}

// Função para atualizar um pedido, incluindo seus itens
async function updatePedido(id, { cliente_id, valor_total, itens }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      'UPDATE pedidos SET cliente_id = ?, valor_total = ? WHERE pedido_id = ?',
      [cliente_id, valor_total, id]
    );

    await conn.query('DELETE FROM itens_pedido WHERE pedido_id = ?', [id]);

    for (const item of itens) {
      await conn.query(
        'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
        [id, item.produto_id, item.quantidade, item.preco_unitario]
      );
    }

    await conn.commit();
    return { pedido_id: id };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    if (conn) conn.end();
  }
}

// Função para excluir um pedido
async function deletePedido(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query('DELETE FROM pedidos WHERE pedido_id = ?', [id]);
    return result;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
};
