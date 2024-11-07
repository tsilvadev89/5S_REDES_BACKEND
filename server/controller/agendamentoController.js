const agendamentoModel = require('../models/agendamentoModel');

// Criar um novo agendamento
async function createAgendamento(req, res) {
  const { cliente_id, servico_id, funcionario_id, data_hora, status } = req.body;
  try {
    const agendamento = await agendamentoModel.createAgendamento({ cliente_id, servico_id, funcionario_id, data_hora, status });
    res.status(201).json({ message: 'Agendamento criado com sucesso', agendamento });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error: err });
  }
}

// Obter todos os agendamentos
async function getAgendamentos(req, res) {
  try {
    const agendamentos = await agendamentoModel.getAgendamentos();
    res.status(200).json(agendamentos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter agendamentos', error: err });
  }
}

// Obter um agendamento por ID
async function getAgendamentoById(req, res) {
  const { id } = req.params;
  try {
    const agendamento = await agendamentoModel.getAgendamentoById(id);
    agendamento ? res.status(200).json(agendamento) : res.status(404).json({ message: 'Agendamento não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter agendamento', error: err });
  }
}

// Atualizar um agendamento por ID
async function updateAgendamento(req, res) {
  const { id } = req.params;
  const { data_hora, status } = req.body;
  try {
    const updated = await agendamentoModel.updateAgendamento(id, { data_hora, status });
    updated ? res.status(200).json({ message: 'Agendamento atualizado com sucesso' }) : res.status(404).json({ message: 'Agendamento não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error: err });
  }
}

// Excluir um agendamento por ID
async function deleteAgendamento(req, res) {
  const { id } = req.params;
  try {
    const deleted = await agendamentoModel.deleteAgendamento(id);
    deleted ? res.status(200).json({ message: 'Agendamento excluído com sucesso' }) : res.status(404).json({ message: 'Agendamento não encontrado' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir agendamento', error: err });
  }
}

module.exports = {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento,
};
