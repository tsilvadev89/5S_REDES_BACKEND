const express = require('express');
const funcionarioController = require('../controller/funcionarioController');
const router = express.Router();

// Rota para criar um novo funcionário
router.post('/', funcionarioController.createFuncionario);

// Rota para obter todos os funcionários
router.get('/', funcionarioController.getFuncionarios);

// Rota para obter um funcionário específico por ID
router.get('/:id', funcionarioController.getFuncionarioById);

// Rota para atualizar um funcionário por ID
router.put('/:id', funcionarioController.updateFuncionario);

// Rota para excluir um funcionário por ID
router.delete('/:id', funcionarioController.deleteFuncionario);

module.exports = router;
