const express = require('express');
const { Agendamento } = require('../models');
const router = express.Router();

// Criar um agendamento
router.post('/', async (req, res) => {
  try {
    const agendamento = await Agendamento.create(req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error });
  }
});

// Obter todos os agendamentos
router.get('/', async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter agendamentos', error });
  }
});

// Obter um agendamento por ID
router.get('/:id', async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (agendamento) {
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter agendamento', error });
  }
});

// Atualizar um agendamento por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Agendamento.update(req.body, { where: { agendamento_id: req.params.id } });
    if (updated) {
      const agendamento = await Agendamento.findByPk(req.params.id);
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
  }
});

// Excluir um agendamento por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Agendamento.destroy({ where: { agendamento_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir agendamento', error });
  }
});

module.exports = router;
