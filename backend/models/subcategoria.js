/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const SubCategoria = sequelize.define(
    "subcategoria",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      categoria_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "categoria",
          key: "id"
        }
      }
    },
    {
      tableName: "subcategoria",
      timestamps: false,
      createdAt: false
    }
  );

  SubCategoria.associate = models => {
    models.sub_categoria.hasMany(models.feirante, {
      foreignKey: "sub_categoria",
      sourceKey: "id"
    });
    models.sub_categoria.belongsTo(models.categoria, {
      foreignKey: "categoria",
      sourceKey: "id"
    });
  };

  return SubCategoria;
};
