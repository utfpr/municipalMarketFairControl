/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const Participa = sequelize.define(
    'participa',
    {
      cpf_feirante: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: '',
        primaryKey: true,
        references: {
          model: 'feirante',
          key: 'cpf',
        },
      },
      data_feira: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '0000-00-00',
        primaryKey: true,
        references: {
          model: 'feira',
          key: 'data',
        },
      },
      faturamento: {
        type: 'DOUBLE',
        allowNull: true,
        defaultValue: 0,
      },
      celula_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'celula',
          key: 'id',
        },
      },
    },
    {
      tableName: 'participa',
      timestamps: false,
      createdAt: false,
    },
  );
  Participa.associate = models => {
    models.feira.belongsToMany(models.feirante, {
      through: models.participa,
      as: 'Feirantes',
      foreignKey: 'data_feira',
    });
    models.feirante.belongsToMany(models.feira, {
      through: models.participa,
      as: 'Feiras',
      foreignKey: 'cpf_feirante',
    });
    models.participa.belongsTo(models.celula, {
      foreignKey: 'celula_id',
      targetKey: 'id',
      as: 'Celula',
    });
  };
  return Participa;
};
