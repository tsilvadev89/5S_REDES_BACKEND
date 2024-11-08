const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'salao_beleza',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mariadb',
    logging: false,  // Desabilitar logs do Sequelize (opcional)
  }
);

// Importar modelos
const Agendamento = require('./agendamentoModel')(sequelize, Sequelize);
const Cargo = require('./cargoModel')(sequelize, Sequelize);
const Categoria = require('./categoriaModel')(sequelize, Sequelize);
const Cliente = require('./clienteModel')(sequelize, Sequelize);
const Endereco = require('./enderecoModel')(sequelize, Sequelize);
const Funcionario = require('./funcionarioModel')(sequelize, Sequelize);
const Pedido = require('./pedidoModel')(sequelize, Sequelize);
const Produto = require('./produtoModel')(sequelize, Sequelize);
const Servico = require('./servicoModel')(sequelize, Sequelize);
const ItemPedido = require('./itemPedidoModel')(sequelize, Sequelize);

// Configurar associações entre modelos

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

// Exportar conexão e modelos
module.exports = {
  sequelize,
  Sequelize,
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
