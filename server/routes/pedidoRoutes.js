const express = require('express');
const { Pedido } = require('../models');
const router = express.Router();

// Criar um pedido
router.post('/', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pedido', error });
  }
});

// Obter todos os pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pedidos', error });
  }
});

// Obter um pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter pedido', error });
  }
});

// Atualizar um pedido por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Pedido.update(req.body, { where: { pedido_id: req.params.id } });
    if (updated) {
      const pedido = await Pedido.findByPk(req.params.id);
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error });
  }
});

// Excluir um pedido por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pedido.destroy({ where: { pedido_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir pedido', error });
  }
});

module.exports = router;
