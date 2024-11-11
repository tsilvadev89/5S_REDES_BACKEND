const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  cliente_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  primeiro_nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING(100), 
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  imagem_url: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'clientes',
  timestamps: false,
});

module.exports = Cliente;
