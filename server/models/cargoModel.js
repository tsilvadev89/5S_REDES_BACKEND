const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cargo = sequelize.define('Cargo', {
  cargo_id: {
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
  tableName: 'cargos',
  timestamps: false,
});

module.exports = Cargo;
