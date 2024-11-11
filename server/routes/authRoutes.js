const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controller/authController');

// Rota de login
router.post('/login', loginUsuario);

module.exports = router;
