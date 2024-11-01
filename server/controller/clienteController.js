const clienteModel = require('../models/clienteModel');

// Criar um novo cliente
async function createCliente(req, res) {
  const { primeiro_nome, sobrenome, email, data_nascimento } = req.body;
  try {
    const cliente = await clienteModel.createCliente({ primeiro_nome, sobrenome, email, data_nascimento });
    res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar cliente', error: err });
  }
}

// Obter todos os clientes
async function getClientes(req, res) {
  try {
    const clientes = await clienteModel.getClientes();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter clientes', error: err });
  }
}

// Obter um cliente por ID
async function getClienteById(req, res) {
  const { id } = req.params;
  try {
    const cliente = await clienteModel.getClienteById(id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter cliente', error: err });
  }
}

// Atualizar um cliente por ID
async function updateCliente(req, res) {
  const { id } = req.params;
  const { primeiro_nome, sobrenome, email, data_nascimento } = req.body;
  try {
    const updated = await clienteModel.updateCliente(id, { primeiro_nome, sobrenome, email, data_nascimento });
    if (updated) {
      res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: err });
  }
}

// Excluir um cliente por ID
async function deleteCliente(req, res) {
  const { id } = req.params;
  try {
    const deleted = await clienteModel.deleteCliente(id);
    if (deleted) {
      res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error: err });
  }
}

module.exports = {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente
};
