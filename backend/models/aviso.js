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
      data_feira: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: "0000-00-00",
        primaryKey: true,
        references: {
          model: "feira",
          key: "data",
        },
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
