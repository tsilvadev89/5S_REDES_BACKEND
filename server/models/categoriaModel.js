const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Categoria = sequelize.define('Categoria', {
    categoria_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    imagem_url: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'categorias',
    timestamps: false,
  });

  return Categoria;
};
