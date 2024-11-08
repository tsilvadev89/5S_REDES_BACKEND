const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Agendamento = sequelize.define('Agendamento', {
    agendamento_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clientes',
        key: 'cliente_id',
      },
      allowNull: false,
    },
    servico_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'servicos',
        key: 'servico_id',
      },
    },
    funcionario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'funcionarios',
        key: 'funcionario_id',
      },
    },
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado', 'concluido'),
      defaultValue: 'pendente',
    },
  }, {
    tableName: 'agendamentos',
    timestamps: false,
  });

  Agendamento.associate = (models) => {
    Agendamento.belongsTo(models.Cliente, {
      foreignKey: 'cliente_id',
      as: 'cliente',
    });
    Agendamento.belongsTo(models.Servico, {
      foreignKey: 'servico_id',
      as: 'servico',
    });
    Agendamento.belongsTo(models.Funcionario, {
      foreignKey: 'funcionario_id',
      as: 'funcionario',
    });
  };

  return Agendamento;
};
