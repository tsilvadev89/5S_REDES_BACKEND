const { Pedido, Cliente, ItemPedido } = require('../models');

// Criar um novo pedido
exports.createPedido = async (req, res) => {
  try {
    const { cliente_id, valor_total, itens } = req.body;
    const pedido = await Pedido.create({ cliente_id, valor_total });
    
    // Adicionar itens ao pedido, caso sejam fornecidos
    if (itens && Array.isArray(itens)) {
      for (const item of itens) {
        await ItemPedido.create({
          pedido_id: pedido.pedido_id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        });
      }
    }
    
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido', error });
  }
};

// Obter todos os pedidos
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({ include: [Cliente, ItemPedido] });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pedidos', error });
  }
};

// Obter um pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id, { include: [Cliente, ItemPedido] });
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pedido', error });
  }
};

// Atualizar um pedido por ID
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id, valor_total } = req.body;
    const [updated] = await Pedido.update(
      { cliente_id, valor_total },
      { where: { pedido_id: id } }
    );
    if (updated) {
      const updatedPedido = await Pedido.findByPk(id);
      res.status(200).json(updatedPedido);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error });
  }
};

// Excluir um pedido por ID
exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pedido.destroy({ where: { pedido_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir pedido', error });
  }
};
