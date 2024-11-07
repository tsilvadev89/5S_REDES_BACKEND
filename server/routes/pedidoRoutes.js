const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidoController');

// Endpoints para pedidos
router.get('/', pedidoController.getPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.post('/', pedidoController.createPedido);
router.put('/:id', pedidoController.updatePedido);
router.delete('/:id', pedidoController.deletePedido);

// Endpoints para itens de pedido dentro de pedidos
router.get('/:id/itens', pedidoController.getItensPedido);
router.post('/:id/itens', pedidoController.createItemPedido);
router.put('/:id/itens/:itemId', pedidoController.updateItemPedido);
router.delete('/:id/itens/:itemId', pedidoController.deleteItemPedido);

module.exports = router;
