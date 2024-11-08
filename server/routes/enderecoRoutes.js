const express = require('express');
const { Endereco } = require('../models');
const router = express.Router();

// Criar um endereço
router.post('/', async (req, res) => {
  try {
    const endereco = await Endereco.create(req.body);
    res.status(201).json(endereco);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar endereço', error });
  }
});

// Obter todos os endereços
router.get('/', async (req, res) => {
  try {
    const enderecos = await Endereco.findAll();
    res.status(200).json(enderecos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter endereços', error });
  }
});

// Obter um endereço por ID
router.get('/:id', async (req, res) => {
  try {
    const endereco = await Endereco.findByPk(req.params.id);
    if (endereco) {
      res.status(200).json(endereco);
    } else {
      res.status(404).json({ message: 'Endereço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter endereço', error });
  }
});

// Atualizar um endereço por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Endereco.update(req.body, { where: { endereco_id: req.params.id } });
    if (updated) {
      const endereco = await Endereco.findByPk(req.params.id);
      res.status(200).json(endereco);
    } else {
      res.status(404).json({ message: 'Endereço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar endereço', error });
  }
});

// Excluir um endereço por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Endereco.destroy({ where: { endereco_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Endereço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir endereço', error });
  }
});

module.exports = router;
