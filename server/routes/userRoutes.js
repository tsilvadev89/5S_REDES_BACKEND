const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// Rotas CRUD para usuário
router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getUsers);
router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);


module.exports = router;
