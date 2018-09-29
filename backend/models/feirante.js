/* jshint indent: 2 */
/* eslint-disable */

module.exports = function(sequelize, DataTypes) {
  const Feirante = sequelize.define(
    'feirante',
    {
      cpf: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: '',
        primaryKey: true,
      },
      cnpj: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      usa_ee: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
      },
      nome_ficticio: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      razao_social: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      comprimento_barraca: {
        type: 'DOUBLE',
        allowNull: false,
      },
      largura_barraca: {
        type: 'DOUBLE',
        allowNull: false,
      },
      endereco: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      voltagem_ee: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        defaultValue: 1,
      },
      sub_categoria_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'subcategoria',
          key: 'id',
        },
      },
      senha: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: 'feirante',
      timestamps: false,
      createdAt: false,
    },
  );

  Feirante.associate = models => {
    models.feirante.belongsTo(models.subcategoria, {
      foreignKey: 'sub_categoria_id',
      targetKey: 'id',
    });
    models.feirante.hasOne(models.celula, {
      as: 'id',
    });
  };
  return Feirante;
};
