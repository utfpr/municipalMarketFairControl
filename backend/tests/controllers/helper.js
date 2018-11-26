const models = require('../../models');

before(async () => {
  await models.categoria.destroy({ where: {} });
  await models.celula.destroy({ where: {} });
  await models.endereco.destroy({ where: {} });
  await models.feira.destroy({ where: {} });
  await models.feirante.destroy({ where: {} });
  await models.participa.destroy({ where: {} });
  await models.subcategoria.destroy({ where: {} });
  await models.supervisor.destroy({ where: {} });
});

after(async () => {
  await models.categoria.destroy({ where: {} });
  await models.celula.destroy({ where: {} });
  await models.endereco.destroy({ where: {} });
  await models.feira.destroy({ where: {} });
  await models.feirante.destroy({ where: {} });
  await models.participa.destroy({ where: {} });
  await models.subcategoria.destroy({ where: {} });
  await models.supervisor.destroy({ where: {} });
  models.sequelize.close();
});
