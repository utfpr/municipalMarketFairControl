/* jshint indent: 2 */
module.exports = (sequelize, DataTypes) => {
  const Feirante = sequelize.define(
    'feirante',
    {
      cpf: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: '',
        primaryKey: true,
      },
      rg: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      usa_ee: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
      },
      nome_fantasia: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      razao_social: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      comprimento_barraca: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      largura_barraca: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      voltagem_ee: {
        type: DataTypes.INTEGER(),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
        defaultValue: true,
      },
      sub_categoria_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        references: {
          model: 'subcategoria',
          key: 'id',
        },
      },
      senha: {
        type: DataTypes.STRING(500),
        allowNull: false,
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
      as: "sub_categoria",
      foreignKey: "sub_categoria_id",
      targetKey: "id"
    });
    models.feirante.hasOne(models.endereco, {
      as: "endereco",
      foreignKey: "cpf_feirante"
    });
    models.feirante.hasOne(models.celula, {
      as: "id",
      foreignKey: "cpf_feirante"
    });
  };
  return Feirante;
};
