const funcionarioModel = require('../models/funcionarioModel');

// Criar um novo funcionário
async function createFuncionario(req, res) {
  const { primeiro_nome, sobrenome, email, cargo_id, data_contratacao } = req.body;
  try {
    const funcionario = await funcionarioModel.createFuncionario({ primeiro_nome, sobrenome, email, cargo_id, data_contratacao });
    res.status(201).json({ message: 'Funcionário criado com sucesso', funcionario });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar funcionário', error: err });
  }
}

// Obter todos os funcionários
async function getFuncionarios(req, res) {
  try {
    const funcionarios = await funcionarioModel.getFuncionarios();
    res.status(200).json(funcionarios);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter funcionários', error: err });
  }
}

// Obter um funcionário por ID
async function getFuncionarioById(req, res) {
  const { id } = req.params;
  try {
    const funcionario = await funcionarioModel.getFuncionarioById(id);
    if (funcionario) {
      res.status(200).json(funcionario);
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter funcionário', error: err });
  }
}

// Atualizar um funcionário por ID
async function updateFuncionario(req, res) {
  const { id } = req.params;
  const { primeiro_nome, sobrenome, email, cargo_id, data_contratacao } = req.body;
  try {
    const updated = await funcionarioModel.updateFuncionario(id, { primeiro_nome, sobrenome, email, cargo_id, data_contratacao });
    if (updated) {
      res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar funcionário', error: err });
  }
}

// Excluir um funcionário por ID
async function deleteFuncionario(req, res) {
  const { id } = req.params;
  try {
    const deleted = await funcionarioModel.deleteFuncionario(id);
    if (deleted) {
      res.status(200).json({ message: 'Funcionário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir funcionário', error: err });
  }
}

module.exports = {
  createFuncionario,
  getFuncionarios,
  getFuncionarioById,
  updateFuncionario,
  deleteFuncionario
};
