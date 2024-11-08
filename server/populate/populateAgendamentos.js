// populate/populateAgendamentos.js
const { Agendamento } = require('../models');

async function populateAgendamentos() {
  console.log('Inserindo agendamentos...');
  for (let clienteId = 1; clienteId <= 5; clienteId++) {
    for (let i = 1; i <= 2; i++) {
      await Agendamento.create({
        cliente_id: clienteId,
        servico_id: (i % 5) + 1,
        funcionario_id: ((i % 5) + 1),
        data_hora: new Date(new Date().setDate(new Date().getDate() + i)),
        status: 'confirmado',
      });
    }
  }
  console.log('Agendamentos inseridos.');
}

module.exports = populateAgendamentos;
