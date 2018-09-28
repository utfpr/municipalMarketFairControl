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
        allowNull: true
      },
      senha: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      is_adm: {
        type: DataTypes.INTEGER(1),
        allowNull: true
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
