const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const supervisorController = require('../../controllers/supervisor');
const categoriaController = require('../../controllers/categoria');
const feiranteController = require('../../controllers/feirante');
const loginController = require('../../controllers/login');
const app = require('../../app');
const models = require('../../models');

const { assert } = chai;

chai.use(chaiHttp);

describe('celula.js', () => {
  let tokenFeirante;
  let feirante;
  let tokenSupervisor;
  before(async () => {
    const supervisor = await supervisorController.addSupervisor(
      '89569380080',
      faker.name.firstName(),
      '1234',
      true,
    );

    const categoria = await categoriaController.addCategoria('Alimento', false);
    const subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
    feirante = await feiranteController.addFeirante(
      '58295846035',
      '469964807',
      faker.name.firstName(),
      '',
      '1234',
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

    await models.celula.create({ id: 1, periodo: 1 });

    tokenFeirante = (await loginController.login(feirante.cpf, '1234')).token;
    tokenSupervisor = (await loginController.login(supervisor.cpf, '1234')).token;
  });

  after(async () => {
    await models.celula.destroy({ where: {} });
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
    // await models.sequelize.close();
  });

  describe('GET /celula', () => {
    it('Feirante não pode listar celulas', async () => {
      const res = await chai
        .request(app)
        .get('/celula')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 401);
    });

    it('Supervisor pode listar celulas', async () => {
      const res = await chai
        .request(app)
        .get('/celula')
        .set('token', tokenSupervisor);

      assert.strictEqual(res.statusCode, 200);
      assert.lengthOf(res.body, 1);
      assert.strictEqual(res.body[0].periodo, 1);
    });
  });
  describe('GET /celula/:id', () => {
    it('Lista celula inexistente', async () => {
      const res = await chai
        .request(app)
        .get('/celula/100')
        .set('token', tokenSupervisor);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'id_nao_existente');
    });

    it('Lista celula', async () => {
      const res = await chai
        .request(app)
        .get('/celula/1')
        .set('token', tokenSupervisor);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.periodo, 1);
    });
  });
  describe('PUT /celula/:id', () => {
    it('Atributo inválido', async () => {
      const res = await chai
        .request(app)
        .put('/celula/1')
        .set('token', tokenSupervisor)
        .send({ periodo: 'string' });

      assert.strictEqual(res.statusCode, 400);
    });

    it('CPF inválido', async () => {
      const res = await chai
        .request(app)
        .put('/celula/1')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: '11111111111' });

      assert.strictEqual(res.statusCode, 400);
    });

    it('CPF não existente', async () => {
      const res = await chai
        .request(app)
        .put('/celula/1')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: '59517816049' });

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cpf_nao_existente');
    });
    it('ID não existente', async () => {
      const res = await chai
        .request(app)
        .put('/celula/100')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf });

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'id_nao_existente');
    });

    it('Atualiza celula', async () => {
      const res = await chai
        .request(app)
        .put('/celula/1')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf });

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });
  });
});
