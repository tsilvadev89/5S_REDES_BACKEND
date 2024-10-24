const userModel = require('../models/userModel');

// Criar um novo usuário
async function createUser(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const result = await userModel.createUser({ nome, email, senha });
    res.status(201).json({ message: 'Usuário criado com sucesso', result });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', err });
  }
}

// Buscar todos os usuários
async function getUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', err });
  }
}

// Buscar usuário por ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário', err });
  }
}

// Atualizar usuário
async function updateUser(req, res) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const result = await userModel.updateUser(id, { nome, email, senha });
    res.status(200).json({ message: 'Usuário atualizado com sucesso', result });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', err });
  }
}

// Excluir usuário
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await userModel.deleteUser(id);
    res.status(200).json({ message: 'Usuário excluído com sucesso', result });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir usuário', err });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
