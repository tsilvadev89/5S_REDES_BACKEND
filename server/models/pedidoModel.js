const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  pedido_id: {
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
  data_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'pedidos',
  timestamps: false,
});

module.exports = Pedido;
