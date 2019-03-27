/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const Supervisor = sequelize.define(
    "supervisor",
    {
      cpf: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "",
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      is_adm: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: 0
      },
      root_adm: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: 0
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      tableName: "supervisor",
      timestamps: false,
      createdAt: false
    }
  );
  return Supervisor;
};
