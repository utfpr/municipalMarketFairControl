const models = require('../../models');

before(async () => {
  await models.celula.destroy({ where: {} });
  await models.categoria.destroy({ where: {} });
  await models.subcategoria.destroy({ where: {} });
  await models.feirante.destroy({ where: {} });
  await models.supervisor.destroy({ where: {} });
});

after(() => {
  models.sequelize.close();
});
