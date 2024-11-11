const bcrypt = require('bcrypt');
const { Funcionario } = require('../models');

// Criar um novo funcionário
exports.createFuncionario = async (req, res) => {
  try {
    const { primeiro_nome, sobrenome, email, cargo_id, data_contratacao, imagem_url, senha } = req.body;

    // Hash da senha antes de armazenar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);

    const funcionario = await Funcionario.create({
      primeiro_nome,
      sobrenome,
      email,
      cargo_id,
      data_contratacao,
      imagem_url,
      senha: hashedPassword, // Armazenando a senha criptografada
    });

    res.status(201).json(funcionario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar funcionário', error });
  }
};

// Obter todos os funcionários
exports.getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter funcionários', error });
  }
};

// Obter um funcionário por ID
exports.getFuncionarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionario = await Funcionario.findByPk(id);
    if (funcionario) {
      res.status(200).json(funcionario);
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter funcionário', error });
  }
};

// Atualizar um funcionário por ID
exports.updateFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const { primeiro_nome, sobrenome, email, cargo_id, data_contratacao, imagem_url, senha } = req.body;

    const updatedData = { primeiro_nome, sobrenome, email, cargo_id, data_contratacao, imagem_url };

    // Verifica se a senha foi fornecida e hasheia antes de atualizar
    if (senha) {
      updatedData.senha = await bcrypt.hash(senha, 10);
    }

    const [updated] = await Funcionario.update(updatedData, { where: { funcionario_id: id } });
    if (updated) {
      const updatedFuncionario = await Funcionario.findByPk(id);
      res.status(200).json(updatedFuncionario);
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar funcionário', error });
  }
};

// Excluir um funcionário por ID
exports.deleteFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Funcionario.destroy({ where: { funcionario_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir funcionário', error });
  }
};
