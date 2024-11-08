const express = require('express');
const { Produto } = require('../models');
const router = express.Router();

// Criar um produto
router.post('/', async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error });
  }
});

// Obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos', error });
  }
});

// Obter um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produto', error });
  }
});

// Atualizar um produto por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Produto.update(req.body, { where: { produto_id: req.params.id } });
    if (updated) {
      const produto = await Produto.findByPk(req.params.id);
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
});

// Excluir um produto por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Produto.destroy({ where: { produto_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir produto', error });
  }
});

module.exports = router;
