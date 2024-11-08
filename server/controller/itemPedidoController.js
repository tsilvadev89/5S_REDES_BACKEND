const { ItemPedido, Pedido, Produto } = require('../models');

// Criar um novo item de pedido
exports.createItemPedido = async (req, res) => {
  try {
    const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;
    const itemPedido = await ItemPedido.create({ pedido_id, produto_id, quantidade, preco_unitario });
    res.status(201).json(itemPedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar item de pedido', error });
  }
};

// Obter todos os itens de pedido
exports.getItensPedido = async (req, res) => {
  try {
    const itensPedido = await ItemPedido.findAll({ include: [Pedido, Produto] });
    res.status(200).json(itensPedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter itens de pedido', error });
  }
};

// Obter um item de pedido por ID
exports.getItemPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const itemPedido = await ItemPedido.findByPk(id, { include: [Pedido, Produto] });
    if (itemPedido) {
      res.status(200).json(itemPedido);
    } else {
      res.status(404).json({ message: 'Item de pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter item de pedido', error });
  }
};

// Atualizar um item de pedido por ID
exports.updateItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;
    const [updated] = await ItemPedido.update(
      { pedido_id, produto_id, quantidade, preco_unitario },
      { where: { item_id: id } }
    );
    if (updated) {
      const updatedItemPedido = await ItemPedido.findByPk(id);
      res.status(200).json(updatedItemPedido);
    } else {
      res.status(404).json({ message: 'Item de pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar item de pedido', error });
  }
};

// Excluir um item de pedido por ID
exports.deleteItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ItemPedido.destroy({ where: { item_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Item de pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir item de pedido', error });
  }
};
