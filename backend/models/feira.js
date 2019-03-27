/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Feira = sequelize.define(
    'feira',
    {
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '0000-00-00',
        primaryKey: true,
      },
      data_limite: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      tableName: 'feira',
      timestamps: false,
      createdAt: false,
    },
  );

  return Feira;
};
