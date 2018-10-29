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
        type: DataTypes.INTEGER(1),
        allowNull: false,
      },
      nome_fantasia: {
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
        allowNull: false,
      },
    },
    {
      tableName: 'feirante',
      timestamps: false,
      createdAt: false,
    },
  );

  Feirante.associate = (models) => {
    models.feirante.hasOne(models.subcategoria, {
      as: 'sub_categoria',
      foreignKey: 'sub_categoria_id',
      targetKey: 'id',
    });
    models.feirante.hasOne(models.endereco, {
      as: 'endereco',
      foreignKey: 'cpf_feirante',
    });
    models.feirante.hasOne(models.celula, {
      as: 'id',
      foreignKey: 'cpf_feirante',
    });
    models.feirante.belongsToMany(models.participa, {
      foreignKey: 'cpf_feirante',
      targetKey: 'cpf',
    });
  };
  return Feirante;
};
