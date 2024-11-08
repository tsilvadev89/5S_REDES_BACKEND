// populate/populateCargos.js
const { Cargo } = require('../models');

async function populateCargos() {
  console.log('Inserindo dados de cargos...');
  await Cargo.bulkCreate([
    { nome: 'Cabeleireiro', descricao: 'Especialista em cortes e penteados' },
    { nome: 'Manicure', descricao: 'Especialista em cuidados das unhas' },
    { nome: 'Esteticista', descricao: 'Especialista em tratamentos estéticos' },
    { nome: 'Colorista', descricao: 'Especialista em coloração capilar' },
    { nome: 'Recepcionista', descricao: 'Responsável pelo atendimento ao cliente' },
  ]);
  console.log('Cargos inseridos.');
}

module.exports = populateCargos;
