const servicoModel = require('../models/servicoModel');

// Criar um novo serviço
async function createServico(req, res) {
  const { nome, descricao, preco, duracao } = req.body;
  try {
    const servico = await servicoModel.createServico({ nome, descricao, preco, duracao });
    res.status(201).json({ message: 'Serviço criado com sucesso', servico });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar serviço', error: err });
  }
}

// Obter todos os serviços
async function getServicos(req, res) {
  try {
    const servicos = await servicoModel.getServicos();
    res.status(200).json(servicos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter serviços', error: err });
  }
}

// Obter um serviço por ID
async function getServicoById(req, res) {
  const { id } = req.params;
  try {
    const servico = await servicoModel.getServicoById(id);
    if (servico) {
      res.status(200).json(servico);
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter serviço', error: err });
  }
}

// Atualizar um serviço por ID
async function updateServico(req, res) {
  const { id } = req.params;
  const { nome, descricao, preco, duracao } = req.body;
  try {
    const updated = await servicoModel.updateServico(id, { nome, descricao, preco, duracao });
    if (updated) {
      res.status(200).json({ message: 'Serviço atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar serviço', error: err });
  }
}

// Excluir um serviço por ID
async function deleteServico(req, res) {
  const { id } = req.params;
  try {
    const deleted = await servicoModel.deleteServico(id);
    if (deleted) {
      res.status(200).json({ message: 'Serviço excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir serviço', error: err });
  }
}

module.exports = {
  createServico,
  getServicos,
  getServicoById,
  updateServico,
  deleteServico
};
