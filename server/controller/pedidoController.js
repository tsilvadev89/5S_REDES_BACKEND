const pedidoModel = require('../models/pedidoModel');

// CRUD para pedidos

// Criar um novo pedido
async function createPedido(req, res) {
  const { cliente_id, valor_total } = req.body;
  try {
    const pedido = await pedidoModel.createPedido({ cliente_id, valor_total });
    res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: err });
  }
}

// Obter todos os pedidos
async function getPedidos(req, res) {
  try {
    const pedidos = await pedidoModel.getPedidos();
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter pedidos', error: err });
  }
}

// Obter um pedido por ID
async function getPedidoById(req, res) {
  const { id } = req.params;
  try {
    const pedido = await pedidoModel.getPedidoById(id);
    pedido ? res.status(200).json(pedido) : res.status(404).json({ message: 'Pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter pedido', error: err });
  }
}

// Atualizar um pedido
async function updatePedido(req, res) {
  const { id } = req.params;
  const { valor_total } = req.body;
  try {
    const updated = await pedidoModel.updatePedido(id, { valor_total });
    updated ? res.status(200).json({ message: 'Pedido atualizado com sucesso' }) : res.status(404).json({ message: 'Pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error: err });
  }
}

// Excluir um pedido
async function deletePedido(req, res) {
  const { id } = req.params;
  try {
    const deleted = await pedidoModel.deletePedido(id);
    deleted ? res.status(200).json({ message: 'Pedido excluído com sucesso' }) : res.status(404).json({ message: 'Pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir pedido', error: err });
  }
}

// CRUD para itens de pedido

// Obter itens de um pedido
async function getItensPedido(req, res) {
  const { id } = req.params;
  try {
    const itens = await pedidoModel.getItensPedido(id);
    res.status(200).json(itens);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter itens do pedido', error: err });
  }
}

// Criar um novo item de pedido
async function createItemPedido(req, res) {
  const { id } = req.params;
  const { produto_id, quantidade, preco_unitario } = req.body;
  try {
    const itemPedido = await pedidoModel.createItemPedido(id, { produto_id, quantidade, preco_unitario });
    res.status(201).json({ message: 'Item de pedido criado com sucesso', itemPedido });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar item de pedido', error: err });
  }
}

// Atualizar um item de pedido
async function updateItemPedido(req, res) {
  const { id, itemId } = req.params;
  const { quantidade, preco_unitario } = req.body;
  try {
    const updated = await pedidoModel.updateItemPedido(itemId, { quantidade, preco_unitario });
    updated ? res.status(200).json({ message: 'Item de pedido atualizado com sucesso' }) : res.status(404).json({ message: 'Item de pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar item de pedido', error: err });
  }
}

// Excluir um item de pedido
async function deleteItemPedido(req, res) {
  const { itemId } = req.params;
  try {
    const deleted = await pedidoModel.deleteItemPedido(itemId);
    deleted ? res.status(200).json({ message: 'Item de pedido excluído com sucesso' }) : res.status(404).json({ message: 'Item de pedido não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir item de pedido', error: err });
  }
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
