const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Agendamento = sequelize.define('Agendamento', {
  agendamento_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clientes',
      key: 'cliente_id',
    },
    allowNull: false,
  },
  servico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'servicos',
      key: 'servico_id',
    },
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'funcionarios',
      key: 'funcionario_id',
    },
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado', 'concluido'),
    defaultValue: 'pendente',
  },
}, {
  tableName: 'agendamentos',
  timestamps: false,
});

module.exports = Agendamento;
