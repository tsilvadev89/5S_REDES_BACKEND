const express = require('express');
const { Cargo } = require('../models');
const router = express.Router();

// Criar um cargo
router.post('/', async (req, res) => {
  try {
    const cargo = await Cargo.create(req.body);
    res.status(201).json(cargo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cargo', error });
  }
});

// Obter todos os cargos
router.get('/', async (req, res) => {
  try {
    const cargos = await Cargo.findAll();
    res.status(200).json(cargos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cargos', error });
  }
});

// Obter um cargo por ID
router.get('/:id', async (req, res) => {
  try {
    const cargo = await Cargo.findByPk(req.params.id);
    if (cargo) {
      res.status(200).json(cargo);
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cargo', error });
  }
});

// Atualizar um cargo por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Cargo.update(req.body, { where: { cargo_id: req.params.id } });
    if (updated) {
      const cargo = await Cargo.findByPk(req.params.id);
      res.status(200).json(cargo);
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cargo', error });
  }
});

// Excluir um cargo por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cargo.destroy({ where: { cargo_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cargo', error });
  }
});

module.exports = router;
