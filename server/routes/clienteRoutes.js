const express = require('express');
const clienteController = require('../controller/clienteController');
const router = express.Router();

// Rota para criar um novo cliente
router.post('/', clienteController.createCliente);

// Rota para obter todos os clientes
router.get('/', clienteController.getClientes);

// Rota para obter um cliente específico por ID
router.get('/:id', clienteController.getClienteById);

// Rota para atualizar um cliente por ID
router.put('/:id', clienteController.updateCliente);

// Rota para excluir um cliente por ID
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
