const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

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
  tipo: {
    type: DataTypes.ENUM('Produto', 'Serviço'),
    allowNull: false,
    defaultValue: 'Produto',
  },
}, {
  tableName: 'categorias',
  timestamps: false,
});

module.exports = Categoria;
