const { Agendamento, Cliente, Funcionario, Servico } = require('../models');

// Criar um novo agendamento
exports.createAgendamento = async (req, res) => {
  try {
    const { cliente_id, servico_id, funcionario_id, data_hora, status } = req.body;
    const agendamento = await Agendamento.create({ cliente_id, servico_id, funcionario_id, data_hora, status });
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error });
  }
};

// Obter todos os agendamentos
exports.getAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll({ include: [Cliente, Funcionario, Servico] });
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter agendamentos', error });
  }
};

// Obter um agendamento por ID
exports.getAgendamentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id, { include: [Cliente, Funcionario, Servico] });
    if (agendamento) {
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter agendamento', error });
  }
};

// Atualizar um agendamento por ID
exports.updateAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id, servico_id, funcionario_id, data_hora, status } = req.body;
    const [updated] = await Agendamento.update(
      { cliente_id, servico_id, funcionario_id, data_hora, status },
      { where: { agendamento_id: id } }
    );
    if (updated) {
      const updatedAgendamento = await Agendamento.findByPk(id);
      res.status(200).json(updatedAgendamento);
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
  }
};

// Excluir um agendamento por ID
exports.deleteAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Agendamento.destroy({ where: { agendamento_id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir agendamento', error });
  }
};
