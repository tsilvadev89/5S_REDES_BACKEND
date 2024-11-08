// models/index.js
const { sequelize } = require('../config/database');
const Agendamento = require('./agendamentoModel');
const Cargo = require('./cargoModel');
const Categoria = require('./categoriaModel');
const Cliente = require('./clienteModel');
const Endereco = require('./enderecoModel');
const Funcionario = require('./funcionarioModel');
const Pedido = require('./pedidoModel');
const Produto = require('./produtoModel');
const Servico = require('./servicoModel');
const ItemPedido = require('./itemPedidoModel');

// Configura as associações entre os modelos

// Cliente e Endereço
Cliente.hasMany(Endereco, { foreignKey: 'entidade_id', constraints: false, scope: { tipo_entidade: 'cliente' } });
Endereco.belongsTo(Cliente, { foreignKey: 'entidade_id', constraints: false });

// Funcionario e Endereço
Funcionario.hasMany(Endereco, { foreignKey: 'entidade_id', constraints: false, scope: { tipo_entidade: 'funcionario' } });
Endereco.belongsTo(Funcionario, { foreignKey: 'entidade_id', constraints: false });

// Funcionario e Cargo
Cargo.hasMany(Funcionario, { foreignKey: 'cargo_id' });
Funcionario.belongsTo(Cargo, { foreignKey: 'cargo_id' });

// Produto e Categoria
Categoria.hasMany(Produto, { foreignKey: 'categoria_id' });
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

// Servico e Categoria
Categoria.hasMany(Servico, { foreignKey: 'categoria_id' });
Servico.belongsTo(Categoria, { foreignKey: 'categoria_id' });

// Pedido e Cliente
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Pedido e ItemPedido
Pedido.hasMany(ItemPedido, { foreignKey: 'pedido_id' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

// Produto e ItemPedido
Produto.hasMany(ItemPedido, { foreignKey: 'produto_id' });
ItemPedido.belongsTo(Produto, { foreignKey: 'produto_id' });

// Agendamento e Cliente
Cliente.hasMany(Agendamento, { foreignKey: 'cliente_id' });
Agendamento.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Agendamento e Funcionario
Funcionario.hasMany(Agendamento, { foreignKey: 'funcionario_id' });
Agendamento.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });

// Agendamento e Servico
Servico.hasMany(Agendamento, { foreignKey: 'servico_id' });
Agendamento.belongsTo(Servico, { foreignKey: 'servico_id' });

// Exporta a conexão e os modelos
module.exports = {
  sequelize,
  Agendamento,
  Cargo,
  Categoria,
  Cliente,
  Endereco,
  Funcionario,
  Pedido,
  Produto,
  Servico,
  ItemPedido,
};
