/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const Celula = sequelize.define(
    "celula",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "0",
        primaryKey: true
      },
      cpf_feirante: {
        type: DataTypes.STRING(15),
        allowNull: true,
        references: {
          model: "feirante",
          key: "cpf"
        }
      },
      periodo: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    },
    {
      tableName: "celula",
      timestamps: false,
      createdAt: false
    }
  );
  Celula.associate = models => {
    models.celula.hasMany(models.participa, {
      foreignKey: "celula_id",
      sourceKey: "id",
      as: "CelulasParticipa"
    });
    models.celula.belongsTo(models.feirante, {
      foreignKey: 'cpf_feirante',
      targetKey: 'cpf'
    })
  };
  return Celula;
};
