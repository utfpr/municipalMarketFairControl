/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const Categoria = sequelize.define(
    'categoria',
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
      need_cnpj: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      tableName: 'categoria',
      timestamps: false,
      createdAt: false,
    },
  );

  Categoria.associate = models => {
    models.categoria.hasMany(models.subcategoria, {
      foreignKey: 'categoria_id',
      sourceKey: 'id',
      as: 'SubCategorias',
    });
  };

  return Categoria;
};
