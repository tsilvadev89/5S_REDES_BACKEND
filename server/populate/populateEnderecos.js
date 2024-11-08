// populate/populateEnderecos.js
const { Endereco } = require('../models');

async function populateEnderecos() {
  console.log('Inserindo dados de endereços...');
  await Endereco.bulkCreate([
    {
      entidade_id: 1,
      tipo_entidade: 'cliente',
      logradouro: 'Rua A',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000',
    },
    {
      entidade_id: 2,
      tipo_entidade: 'cliente',
      logradouro: 'Rua B',
      numero: '456',
      bairro: 'Vila',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '22000-000',
    },
    {
      entidade_id: 3,
      tipo_entidade: 'cliente',
      logradouro: 'Rua C',
      numero: '789',
      bairro: 'Zona Norte',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      cep: '30000-000',
    },
    {
      entidade_id: 4,
      tipo_entidade: 'cliente',
      logradouro: 'Rua D',
      numero: '101',
      bairro: 'Centro',
      cidade: 'Porto Alegre',
      estado: 'RS',
      cep: '90000-000',
    },
    {
      entidade_id: 1,
      tipo_entidade: 'funcionario',
      logradouro: 'Rua E',
      numero: '202',
      bairro: 'Vila Nova',
      cidade: 'Curitiba',
      estado: 'PR',
      cep: '80000-000',
    },
  ]);
  console.log('Endereços inseridos.');
}

module.exports = populateEnderecos;
