/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const SubCategoria = sequelize.define(
    'subcategoria',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      categoria_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'categoria',
          key: 'id',
        },
      },
    },
    {
      tableName: 'subcategoria',
      timestamps: false,
      createdAt: false,
    },
  );

  SubCategoria.associate = models => {
    models.subcategoria.hasMany(models.feirante, {
      foreignKey: 'sub_categoria_id',
      sourceKey: 'id',
      as: 'SubCategoriasFeirantes',
    });
    models.subcategoria.belongsTo(models.categoria, {
      foreignKey: 'categoria_id',
      sourceKey: 'id',
    });
  };

  return SubCategoria;
};
