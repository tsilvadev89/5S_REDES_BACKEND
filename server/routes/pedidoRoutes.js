const express = require('express');
const pedidoController = require('../controller/pedidoController');

const router = express.Router();

// Rotas CRUD para pedidos
router.post('/', pedidoController.createPedido);
router.get('/', pedidoController.getPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.put('/:id', pedidoController.updatePedido);
router.delete('/:id', pedidoController.deletePedido);

module.exports = router;
