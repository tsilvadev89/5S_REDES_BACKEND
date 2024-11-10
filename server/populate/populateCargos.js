// populate/populateCargos.js
const { Cargo } = require('../models');

async function populateCargos() {
  console.log('Inserindo dados de cargos...');
  await Cargo.bulkCreate([
    { nome: 'Cabeleireiro', descricao: 'Especialista em cortes e penteados', imagem_url: 'https://plus.unsplash.com/premium_photo-1669675935483-01a22e5c88bf?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}'},
    { nome: 'Manicure', descricao: 'Especialista em cuidados das unhas', imagem_url: 'https://images.unsplash.com/photo-1659391542239-9648f307c0b1?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { nome: 'Esteticista', descricao: 'Especialista em tratamentos estéticos', imagem_url: 'https://plus.unsplash.com/premium_photo-1681483462522-80dcd1c017ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { nome: 'Colorista', descricao: 'Especialista em coloração capilar', imagem_url: 'https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { nome: 'Recepcionista', descricao: 'Responsável pelo atendimento ao cliente', imagem_url: 'https://plus.unsplash.com/premium_photo-1664049686025-e20a49fbabfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
  ]);
  console.log('Cargos inseridos.');
}

module.exports = populateCargos;
