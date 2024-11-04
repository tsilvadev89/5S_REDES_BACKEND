const pedidoModel = require('../models/pedidoModel');

// Criar um novo pedido
async function createPedido(req, res) {
  const { cliente_id, valor_total, itens } = req.body;
  try {
    const result = await pedidoModel.createPedido({ cliente_id, valor_total, itens });
    res.status(201).json({ message: 'Pedido criado com sucesso', result });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', err });
  }
}

// Buscar todos os pedidos
async function getPedidos(req, res) {
  try {
    const pedidos = await pedidoModel.getPedidos();
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', err });
  }
}

// Buscar pedido por ID
async function getPedidoById(req, res) {
  const { id } = req.params;
  try {
    const pedido = await pedidoModel.getPedidoById(id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedido', err });
  }
}

// Atualizar pedido
async function updatePedido(req, res) {
  const { id } = req.params;
  const { cliente_id, valor_total, itens } = req.body;
  try {
    const result = await pedidoModel.updatePedido(id, { cliente_id, valor_total, itens });
    res.status(200).json({ message: 'Pedido atualizado com sucesso', result });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', err });
  }
}

// Excluir pedido
async function deletePedido(req, res) {
  const { id } = req.params;
  try {
    const result = await pedidoModel.deletePedido(id);
    res.status(200).json({ message: 'Pedido excluído com sucesso', result });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir pedido', err });
  }
}

module.exports = {
  createPedido,
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
};
