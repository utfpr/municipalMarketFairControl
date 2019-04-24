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
      evento_image_url: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true,
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
