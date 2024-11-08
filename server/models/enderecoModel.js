const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Endereco = sequelize.define('Endereco', {
    endereco_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    entidade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_entidade: {
      type: DataTypes.ENUM('cliente', 'funcionario'),
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(10),
    },
    complemento: {
      type: DataTypes.STRING(50),
    },
    bairro: {
      type: DataTypes.STRING(50),
    },
    cidade: {
      type: DataTypes.STRING(50),
    },
    estado: {
      type: DataTypes.STRING(2),
    },
    cep: {
      type: DataTypes.STRING(10),
    },
    imagem_url: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'enderecos',
    timestamps: false,
  });

  return Endereco;
};
