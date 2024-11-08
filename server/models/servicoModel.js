const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Servico = sequelize.define('Servico', {
    servico_id: {
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
    duracao: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imagem_url: {
      type: DataTypes.STRING(255),
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias',
        key: 'categoria_id',
      },
    },
  }, {
    tableName: 'servicos',
    timestamps: false,
  });

  Servico.associate = (models) => {
    Servico.belongsTo(models.Categoria, {
      foreignKey: 'categoria_id',
      as: 'categoria',
    });
  };

  return Servico;
};
