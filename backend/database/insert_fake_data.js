const faker = require('faker');
const models = require('../models');
const categoriaController = require('../controllers/categoria');
const celulaController = require('../controllers/celula');
const subcategoriaController = require('../controllers/subcategoria');
const feiranteController = require('../controllers/feirante');
const feiraController = require('../controllers/feira');
const participaController = require('../controllers/participa');
const supervisorController = require('../controllers/supervisor');
const { proximoDomingo } = require('../controllers/utils');
// const { insert_celulas } = require('./insert_celulas');

const insert_data = async () => {
  await models.categoria.destroy({ where: {} });
  await models.celula.destroy({ where: {} });
  await models.endereco.destroy({ where: {} });
  await models.aviso.destroy({ where: {} });
  await models.feira.destroy({ where: {} });
  await models.feirante.destroy({ where: {} });
  await models.participa.destroy({ where: {} });
  await models.subcategoria.destroy({ where: {} });
  await models.supervisor.destroy({ where: {} });

  // insert_celulas();
  supervisorController.addSupervisor('56662192007', 'Admin', '123456', true, true).catch(ex => console.error(ex));

  const categoria = await categoriaController.addCategoria('Categoria 1', 1).catch(ex => console.error(ex));
  const subcategoria = await subcategoriaController.addSubcategoria('Subcategoria 1', categoria.id).catch(ex => console.error(ex));
  const feirante1 = await feiranteController.addFeirante(
    '58295846035',
    '469964807',
    faker.name.firstName(),
    '',
    '123456',
    true,
    faker.name.firstName(),
    faker.name.firstName(),
    4,
    4,
    {
      logradouro: faker.address.streetAddress(),
      bairro: faker.address.secondaryAddress(),
      numero: 100,
      CEP: '87.303-065',
    },
    110,
    subcategoria.id,
  ).catch(ex => console.error(ex));

  const feirante2 = await feiranteController.addFeirante(
    '19181608055',
    '469964807',
    faker.name.firstName(),
    '',
    '123456',
    true,
    faker.name.firstName(),
    faker.name.firstName(),
    4,
    4,
    {
      logradouro: faker.address.streetAddress(),
      bairro: faker.address.secondaryAddress(),
      numero: 100,
      CEP: '87.303-065',
    },
    110,
    subcategoria.id,
  ).catch(ex => console.error(ex));

  const feirante3 = await feiranteController.addFeirante(
    '00192857010',
    '469964807',
    faker.name.firstName(),
    '',
    '123456',
    true,
    faker.name.firstName(),
    faker.name.firstName(),
    4,
    4,
    {
      logradouro: faker.address.streetAddress(),
      bairro: faker.address.secondaryAddress(),
      numero: 100,
      CEP: '87.303-065',
    },
    110,
    subcategoria.id,
  ).catch(ex => console.error(ex));

  const feirante4 = await feiranteController.addFeirante(
    '24029942075',
    '469964807',
    faker.name.firstName(),
    '',
    '123456',
    true,
    faker.name.firstName(),
    faker.name.firstName(),
    4,
    4,
    {
      logradouro: faker.address.streetAddress(),
      bairro: faker.address.secondaryAddress(),
      numero: 100,
      CEP: '87.303-065',
    },
    110,
    subcategoria.id,
  ).catch(ex => console.error(ex));

  await feiranteController.addFeirante(
    '52741277036',
    '469964807',
    faker.name.firstName(),
    '',
    '123456',
    true,
    faker.name.firstName(),
    faker.name.firstName(),
    4,
    4,
    {
      logradouro: faker.address.streetAddress(),
      bairro: faker.address.secondaryAddress(),
      numero: 100,
      CEP: '87.303-065',
    },
    110,
    subcategoria.id,
  ).catch(ex => console.error(ex));

  await feiraController.addFeira(proximoDomingo()).catch(ex => console.error(ex));

  await celulaController.updateCelula(1, { cpf_feirante: feirante1.cpf }).catch(ex => console.error(ex));
  await celulaController.updateCelula(2, { cpf_feirante: feirante2.cpf }).catch(ex => console.error(ex));

  await participaController.confirmaPresencaFeiraAtual(feirante1.cpf, 1).catch(ex => console.error(ex));
  await participaController.confirmaPresencaFeiraAtual(feirante2.cpf, 1).catch(ex => console.error(ex));
  await participaController.confirmaPresencaFeiraAtual(feirante3.cpf, 1).catch(ex => console.error(ex));
  await participaController.confirmaPresencaFeiraAtual(feirante4.cpf, 1).catch(ex => console.error(ex));

  process.exit(0);
};

insert_data();
