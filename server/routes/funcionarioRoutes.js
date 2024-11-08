const express = require('express');
const { Funcionario } = require('../models');
const router = express.Router();

// Criar um funcionário
router.post('/', async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar funcionário', error });
  }
});

// Obter todos os funcionários
router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter funcionários', error });
  }
});

// Obter um funcionário por ID
router.get('/:id', async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (funcionario) {
      res.status(200).json(funcionario);
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter funcionário', error });
  }
});

// Atualizar um funcionário por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Funcionario.update(req.body, { where: { funcionario_id: req.params.id } });
    if (updated) {
      const funcionario = await Funcionario.findByPk(req.params.id);
      res.status(200).json(funcionario);
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar funcionário', error });
  }
});

// Excluir um funcionário por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Funcionario.destroy({ where: { funcionario_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir funcionário', error });
  }
});

module.exports = router;
