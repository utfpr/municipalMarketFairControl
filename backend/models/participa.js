/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const Participa = sequelize.define(
    "participa",
    {
      cpf_feirante: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "",
        primaryKey: true,
        references: {
          model: "feirante",
          key: "cpf"
        }
      },
      data_feira: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: "0000-00-00",
        primaryKey: true,
        references: {
          model: "feira",
          key: "data"
        }
      },
      faturamento: {
        type: "DOUBLE",
        allowNull: true,
        defaultValue: 0
      },
      periodo: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      hora_confirmacao: {
        type: DataTypes.DATE,
        allowNull: true
      },
      celula_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "celula",
          key: "id"
        }
      }
    },
    {
      tableName: "participa",
      timestamps: false,
      createdAt: false
    }
  );
  Participa.associate = models => {
    models.participa.hasMany(models.feira, {
      foreignKey: 'data_feira',
      targetKey: 'data',
    });
    models.participa.hasMany(models.feirante, {
      foreignKey: "cpf_feirante",
      targetKey: 'cpf',
    });
    models.participa.belongsTo(models.celula, {
      foreignKey: "celula_id",
      targetKey: "id",
      as: "Celula"
    });
  };
  return Participa;
};
