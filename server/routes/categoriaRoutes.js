const express = require('express');
const { Categoria } = require('../models');
const router = express.Router();

// Criar uma categoria
router.post('/', async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria', error });
  }
});

// Obter todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter categorias', error });
  }
});

// Obter uma categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter categoria', error });
  }
});

// Atualizar uma categoria por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Categoria.update(req.body, { where: { categoria_id: req.params.id } });
    if (updated) {
      const categoria = await Categoria.findByPk(req.params.id);
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error });
  }
});

// Excluir uma categoria por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Categoria.destroy({ where: { categoria_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir categoria', error });
  }
});

module.exports = router;
