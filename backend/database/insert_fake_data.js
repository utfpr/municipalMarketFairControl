const faker = require('faker');
const categoriaController = require('../controllers/categoria');
const subcategoriaController = require('../controllers/subcategoria');
const feiranteController = require('../controllers/feirante');
const feiraController = require('../controllers/feira');
const { proximoDomingo } = require('../controllers/utils');

const insert_data = async () => {
  const categoria = await categoriaController.addCategoria('Categoria 1', true);
  const subcategoria = await subcategoriaController.addSubcategoria('Subcategoria 1', categoria.id);
  const feirante = await feiranteController.addFeirante(
    '58295846035',
    '469964807',
    faker.name.firstName(),
    '',
    faker.name.firstName(),
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
  );

  const feira = await feiraController.addFeira(proximoDomingo());
  process.exit(0);
};

insert_data();
