const express = require('express');
const router = express.Router();
const cargoController = require('../controller/cargoController');

// Define as rotas para cargos
router.get('/', cargoController.getCargos);
router.get('/:id', cargoController.getCargoById);
router.post('/', cargoController.createCargo);
router.put('/:id', cargoController.updateCargo);
router.delete('/:id', cargoController.deleteCargo);

module.exports = router;
