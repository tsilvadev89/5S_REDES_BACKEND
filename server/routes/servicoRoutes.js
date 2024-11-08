const express = require('express');
const { Servico } = require('../models');
const router = express.Router();

// Criar um serviço
router.post('/', async (req, res) => {
  try {
    const servico = await Servico.create(req.body);
    res.status(201).json(servico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar serviço', error });
  }
});

// Obter todos os serviços
router.get('/', async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.status(200).json(servicos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter serviços', error });
  }
});

// Obter um serviço por ID
router.get('/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (servico) {
      res.status(200).json(servico);
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter serviço', error });
  }
});

// Atualizar um serviço por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Servico.update(req.body, { where: { servico_id: req.params.id } });
    if (updated) {
      const servico = await Servico.findByPk(req.params.id);
      res.status(200).json(servico);
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar serviço', error });
  }
});

// Excluir um serviço por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Servico.destroy({ where: { servico_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir serviço', error });
  }
});

module.exports = router;
