const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Produto = sequelize.define('Produto', {
    produto_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categorias',
        key: 'categoria_id',
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imagem_url: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'produtos',
    timestamps: false,
  });

  Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, {
      foreignKey: 'categoria_id',
      as: 'categoria',
    });
  };

  return Produto;
};
