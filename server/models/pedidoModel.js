const db = require('../database/db');

// Funções para pedidos
async function createPedido({ cliente_id, valor_total }) {
  const [result] = await db.query('INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)', [cliente_id, valor_total]);
  return { pedido_id: result.insertId, cliente_id, valor_total };
}

async function getPedidos() {
  const rows = await db.query('SELECT * FROM pedidos');
  return rows;
}

async function getPedidoById(id) {
  const rows = await db.query('SELECT * FROM pedidos WHERE pedido_id = ?', [id]);
  return rows;
}

async function updatePedido(id, { valor_total }) {
  const [result] = await db.query('UPDATE pedidos SET valor_total = ? WHERE pedido_id = ?', [valor_total, id]);
  return result.affectedRows > 0;
}

async function deletePedido(id) {
  const [result] = await db.query('DELETE FROM pedidos WHERE pedido_id = ?', [id]);
  return result.affectedRows > 0;
}

// Funções para itens de pedido
async function getItensPedido(pedidoId) {
  const rows = await db.query('SELECT * FROM itens_pedido WHERE pedido_id = ?', [pedidoId]);
  return rows;
}

async function createItemPedido(pedidoId, { produto_id, quantidade, preco_unitario }) {
  const [result] = await db.query(
    'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
    [pedidoId, produto_id, quantidade, preco_unitario]
  );
  return { item_id: result.insertId, pedido_id: pedidoId, produto_id, quantidade, preco_unitario };
}

async function updateItemPedido(itemId, { quantidade, preco_unitario }) {
  const [result] = await db.query(
    'UPDATE itens_pedido SET quantidade = ?, preco_unitario = ? WHERE item_id = ?',
    [quantidade, preco_unitario, itemId]
  );
  return result.affectedRows > 0;
}

async function deleteItemPedido(itemId) {
  const [result] = await db.query('DELETE FROM itens_pedido WHERE item_id = ?', [itemId]);
  return result.affectedRows > 0;
}

module.exports = {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
  getItensPedido,
  createItemPedido,
  updateItemPedido,
  deleteItemPedido,
};
