const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      allowNull: true,
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

  ItemPedido.associate = (models) => {
    ItemPedido.belongsTo(models.Pedido, {
      foreignKey: 'pedido_id',
      as: 'pedido',
    });
    ItemPedido.belongsTo(models.Produto, {
      foreignKey: 'produto_id',
      as: 'produto',
    });
  };

  return ItemPedido;
};
