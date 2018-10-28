const { assert } = require('chai');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const keys = require('../../config/keys.json');
const feiranteController = require('../../controllers/feirante');
const loginController = require('../../controllers/login');
const supervisorController = require('../../controllers/supervisor');
const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe('login.js', () => {
  let feirante1;
  let feirante2;
  let supervisor1;
  let supervisor2;

  before(async () => {
    await models.categoria.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });

    const categoria = await models.categoria.create({ nome: 'Categoria', need_cnpj: false });
    const subcategoria = await categoria.createSubCategoria({ nome: 'SubCategoria' });

    feirante1 = await feiranteController.addFeirante(
      '58295846035',
      '469964807',
      faker.name.firstName(),
      '',
      '4321',
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

    feirante2 = await feiranteController.addFeirante(
      '72268053083',
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

    supervisor1 = await supervisorController.addSupervisor('73332119087', 'Nome', '1234', false);
    supervisor2 = await supervisorController.addSupervisor('79381775044', 'Nome', '12345', false);
  });

  it('Faz login corretamente (supervisor)', async () => {
    const token = await loginController.login(supervisor1.cpf, '1234');
    assert.isNotNull(token);
    const decoded = await jwt.verify(token.token, keys.jwt);
    assert.strictEqual(decoded, supervisor1.cpf);
  });

  it('Não faz login com senha incorreta (supervisor)', async () => {
    const token = await loginController.login(supervisor1.cpf, '12345');
    assert.isNull(token);
  });

  it('Não faz login com cpf incorreto (supervisor)', async () => {
    const token = await loginController.login(supervisor2.cpf, '1234');
    assert.isNull(token);
  });

  it('Não faz login com cpf inexistente (supervisor)', async () => {
    const token = await loginController.login('11111111117', '1234');
    assert.isNull(token);
  });

  it('Faz login corretamente (feirante)', async () => {
    const token = await loginController.login(feirante1.cpf, '4321');
    assert.isNotNull(token);
    const decoded = await jwt.verify(token.token, keys.jwt);
    assert.strictEqual(decoded, feirante1.cpf);
  });

  it('Não faz login com senha incorreta (feirante)', async () => {
    const token = await loginController.login(feirante1.cpf, '54321');
    assert.isNull(token);
  });

  it('Não faz login com cpf incorreto (feirante)', async () => {
    const token = await loginController.login(feirante2.cpf, '4321');
    assert.isNull(token);
  });

  it('Não faz login com cpf inexistente (feirante)', async () => {
    const token = await loginController.login('22222222224', '4321');
    assert.isNull(token);
  });
});
