const db = require('../database/db');

async function createAgendamento({ cliente_id, servico_id, funcionario_id, data_hora, status }) {
  const [result] = await db.query(
    'INSERT INTO agendamentos (cliente_id, servico_id, funcionario_id, data_hora, status) VALUES (?, ?, ?, ?, ?)',
    [cliente_id, servico_id, funcionario_id, data_hora, status]
  );
  return { agendamento_id: result.insertId, cliente_id, servico_id, funcionario_id, data_hora, status };
}

async function getAgendamentos() {
  const [rows] = await db.query('SELECT * FROM agendamentos');
  return rows;
}

async function getAgendamentoById(id) {
  const [rows] = await db.query('SELECT * FROM agendamentos WHERE agendamento_id = ?', [id]);
  return rows[0];
}

async function updateAgendamento(id, { data_hora, status }) {
  const [result] = await db.query(
    'UPDATE agendamentos SET data_hora = ?, status = ? WHERE agendamento_id = ?',
    [data_hora, status, id]
  );
  return result.affectedRows > 0;
}

async function deleteAgendamento(id) {
  const [result] = await db.query('DELETE FROM agendamentos WHERE agendamento_id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento,
};
