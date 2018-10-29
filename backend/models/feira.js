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
      status: {
        type: DataTypes.INTEGER(1),
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
  Feira.associate = (models) => {
    models.feira.belongsToMany(models.participa, {
      as: 'Feira',
      foreignKey: 'data',
    });
  };
  return Feira;
};
