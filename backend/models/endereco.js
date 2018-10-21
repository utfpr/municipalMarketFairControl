/* jshint indent: 2 */
module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define(
    'endereco',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      logradouro: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bairro: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      numero: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CEP: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      cpf_feirante: {
        type: DataTypes.STRING(15),
        allowNull: true,
        references: {
          model: 'feirante',
          key: 'cpf',
        },
      },
    },
    {
      tableName: 'endereco',
      timestamps: false,
      createdAt: false,
    },
  );

  Endereco.associate = (models) => {
    models.endereco.belongsTo(models.feirante, {
      foreignKey: 'cpf_feirante',
      targetKey: 'cpf',
    });
  };
  return Endereco;
};
