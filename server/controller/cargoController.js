const cargoModel = require('../models/cargoModel');

// Criar um novo cargo
async function createCargo(req, res) {
  const { nome, descricao, imagem_url } = req.body;
  try {
    const cargo = await cargoModel.createCargo({ nome, descricao, imagem_url });
    res.status(201).json({ message: 'Cargo criado com sucesso', cargo });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar cargo', error: err });
  }
}

// Obter todos os cargos
async function getCargos(req, res) {
  try {
    const cargos = await cargoModel.getCargos();
    res.status(200).json(cargos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter cargos', error: err });
  }
}

// Obter um cargo por ID
async function getCargoById(req, res) {
  const { id } = req.params;
  try {
    const cargo = await cargoModel.getCargoById(id);
    if (cargo) {
      res.status(200).json(cargo);
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter cargo', error: err });
  }
}

// Atualizar um cargo por ID
async function updateCargo(req, res) {
  const { id } = req.params;
  const { nome, descricao, imagem_url } = req.body;
  try {
    const updated = await cargoModel.updateCargo(id, { nome, descricao, imagem_url });
    if (updated) {
      res.status(200).json({ message: 'Cargo atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cargo', error: err });
  }
}

// Excluir um cargo por ID
async function deleteCargo(req, res) {
  const { id } = req.params;
  try {
    const deleted = await cargoModel.deleteCargo(id);
    if (deleted) {
      res.status(200).json({ message: 'Cargo excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir cargo', error: err });
  }
}

module.exports = {
  createCargo,
  getCargos,
  getCargoById,
  updateCargo,
  deleteCargo,
};
