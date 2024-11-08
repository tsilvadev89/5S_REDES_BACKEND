// populate/populateData.js
const { sequelize, ensureDatabaseExists } = require('../config/database');

// Importando as funções de população
const populateCargos = require('./populateCargos');
const populateCategorias = require('./populateCategorias');
const populateFuncionarios = require('./populateFuncionarios');
const populateClientes = require('./populateClientes');
const populateEnderecos = require('./populateEnderecos');
const populateProdutos = require('./populateProdutos');
const populateServicos = require('./populateServicos');
const populatePedidosEItens = require('./populatePedidosEItens');
const populateAgendamentos = require('./populateAgendamentos');

// Função principal para popular o banco de dados em ordem lógica
async function populateAllData() {
  try {
    await ensureDatabaseExists();
    console.log('Banco de dados verificado/criado.');

    // Sincronizando o banco de dados
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado com sucesso.');

    // População dos dados na ordem correta
    await populateCargos();           // Cargos primeiro, pois funcionários dependem disso
    await populateCategorias();       // Categorias para que produtos possam ter referência
    await populateFuncionarios();     // Funcionários dependem dos cargos
    await populateClientes();         // Clientes para pedidos e agendamentos
    await populateEnderecos();        // Endereços de clientes e funcionários
    await populateProdutos();         // Produtos após categorias
    await populateServicos();         // Serviços, que podem estar vinculados a categorias
    await populatePedidosEItens();    // Pedidos e itens relacionados a clientes e produtos
    await populateAgendamentos();     // Agendamentos relacionados a clientes e funcionários

    console.log('Banco de dados populado com dados iniciais.');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    throw error;
  }
}

module.exports = populateAllData;
