const express = require('express');
const produtoController = require('../controller/produtoController');
const router = express.Router();

// Rota para criar um novo produto
router.post('/', produtoController.createProduto);

// Rota para obter todos os produtos
router.get('/', produtoController.getProdutos);

// Rota para obter um produto específico por ID
router.get('/:id', produtoController.getProdutoById);

// Rota para atualizar um produto por ID
router.put('/:id', produtoController.updateProduto);

// Rota para excluir um produto por ID
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
