module.exports = (sequelize, DataTypes) => {
  const Aviso = sequelize.define(
    'aviso',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      assunto: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      texto: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: 'aviso',
      timestamps: false,
      createdAt: false,
    },
  );

  return Aviso;
};
