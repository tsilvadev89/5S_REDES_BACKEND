const { Cargo } = require('../models');

// Criar um novo cargo
exports.createCargo = async (req, res) => {
  try {
    const { nome, descricao, imagem_url } = req.body;
    const cargo = await Cargo.create({ nome, descricao, imagem_url });
    res.status(201).json(cargo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cargo', error });
  }
};

// Obter todos os cargos
exports.getCargos = async (req, res) => {
  try {
    const cargos = await Cargo.findAll();
    res.status(200).json(cargos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cargos', error });
  }
};

// Obter um cargo por ID
exports.getCargoById = async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await Cargo.findByPk(id);
    if (cargo) {
      res.status(200).json(cargo);
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cargo', error });
  }
};

// Atualizar um cargo por ID
exports.updateCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, imagem_url } = req.body;
    const [updated] = await Cargo.update({ nome, descricao, imagem_url }, { where: { cargo_id: id } });
    if (updated) {
      const updatedCargo = await Cargo.findByPk(id);
      res.status(200).json(updatedCargo);
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cargo', error });
  }
};

// Excluir um cargo por ID
exports.deleteCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cargo.destroy({ where: { cargo_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cargo', error });
  }
};
