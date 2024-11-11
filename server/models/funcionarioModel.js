const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  funcionario_id: {
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
  cargo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cargos',
      key: 'cargo_id',
    },
  },
  data_contratacao: {
    type: DataTypes.DATE,
  },
  imagem_url: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'funcionarios',
  timestamps: false,
});

module.exports = Funcionario;
