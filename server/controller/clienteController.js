const bcrypt = require('bcrypt');
const { Cliente } = require('../models');
const backupService = require('../services/backupService');

// Criar um novo cliente
exports.createCliente = async (req, res) => {
  try {
    const { primeiro_nome, sobrenome, email, data_nascimento, imagem_url, senha } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const cliente = await Cliente.create({
      primeiro_nome,
      sobrenome,
      email,
      data_nascimento,
      imagem_url,
      senha: hashedPassword, // Armazena a senha criptografada
    });

    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error });
  }
};

// Obter todos os clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter clientes', error });
  }
};

// Obter um cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter cliente', error });
  }
};

// Atualizar um cliente por ID
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { primeiro_nome, sobrenome, email, data_nascimento, imagem_url, senha } = req.body;

    const updatedData = { primeiro_nome, sobrenome, email, data_nascimento, imagem_url };

    // Verifica se a senha foi fornecida e hasheia antes de atualizar
    if (senha) {
      updatedData.senha = await bcrypt.hash(senha, 10);
    }

    const [updated] = await Cliente.update(updatedData, { where: { cliente_id: id } });
    if (updated) {
      const updatedCliente = await Cliente.findByPk(id);
      res.status(200).json(updatedCliente);
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error });
  }
};

// Excluir um cliente por ID
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cliente.destroy({ where: { cliente_id: id } });
    console.log('deleteCliente - ', 'deleteCliente')
    if (deleted) {
      await backupService.removeUserFromBackup(id);
      console.log('deleteCliente - ', 'removeUserFromBackup')

      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error });
  }
};