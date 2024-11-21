const express = require('express');
const router = express.Router();
const { getAllUserData } = require('../controller/lgpdController');
const authenticateToken = require('../controller/authenticateToken');

// ROTA PARA OBTER TODOS OS DADOS ARMAZENADOS DO USUARIO
router.get('/user/data', authenticateToken, getAllUserData);

module.exports = router;
