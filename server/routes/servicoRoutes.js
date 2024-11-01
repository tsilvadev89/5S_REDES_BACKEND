const express = require('express');
const servicoController = require('../controller/servicoController');
const router = express.Router();

// Rota para criar um novo serviço
router.post('/', servicoController.createServico);

// Rota para obter todos os serviços
router.get('/', servicoController.getServicos);

// Rota para obter um serviço específico por ID
router.get('/:id', servicoController.getServicoById);

// Rota para atualizar um serviço por ID
router.put('/:id', servicoController.updateServico);

// Rota para excluir um serviço por ID
router.delete('/:id', servicoController.deleteServico);

module.exports = router;
