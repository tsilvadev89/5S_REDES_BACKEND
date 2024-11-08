const express = require('express');
const { Cliente } = require('../models');
const router = express.Router();

// Criar um cliente
router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error });
  }
});

// Obter todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter clientes', error });
  }
});

// Obter um cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cliente', error });
  }
});

// Atualizar um cliente por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Cliente.update(req.body, { where: { cliente_id: req.params.id } });
    if (updated) {
      const cliente = await Cliente.findByPk(req.params.id);
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error });
  }
});

// Excluir um cliente por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cliente.destroy({ where: { cliente_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error });
  }
});

module.exports = router;
