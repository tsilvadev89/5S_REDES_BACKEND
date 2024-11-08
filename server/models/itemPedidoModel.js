const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ItemPedido = sequelize.define('ItemPedido', {
  item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pedidos',
      key: 'pedido_id',
    },
    allowNull: false,
  },
  produto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'produtos',
      key: 'produto_id',
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'itens_pedido',
  timestamps: false,
});

module.exports = ItemPedido;
