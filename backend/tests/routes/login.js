const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../../app');
const supervisorController = require('../../controllers/supervisor');
const feiranteController = require('../../controllers/feirante');
const categoriaController = require('../../controllers/categoria');
const models = require('../../models');

const { assert } = chai;

chai.use(chaiHttp);

const host = '/api/login/';

describe('Rota Login', () => {
  let feirante;
  let supervisor;
  let admin;
  let subcategoria;
  let categoria;
  before(async () => {
    admin = await supervisorController.addSupervisor(
      '89569380080',
      faker.name.firstName(),
      '123456',
      true,
    );

    supervisor = await supervisorController.addSupervisor(
      '56919550040',
      faker.name.firstName(),
      '1234567',
      false,
    );

    categoria = await categoriaController.addCategoria('Alimento', false);
    subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
    feirante = await feiranteController.addFeirante(
      '58295846035',
      '469964807',
      faker.name.firstName(),
      '',
      '12345678',
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
  });

  after(async () => {
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
  });

  describe('POST /login', () => {
    it('Login Admin', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: admin.cpf,
          senha: '123456',
        });
      assert.strictEqual(res.statusCode, 200);
      assert.isNotNull(res.body.token);
      assert.strictEqual(res.body.tag, 'administrador');
    });

    it('Login Supervisor', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: supervisor.cpf,
          senha: '1234567',
        });
      assert.strictEqual(res.statusCode, 200);
      assert.isNotNull(res.body.token);
      assert.strictEqual(res.body.tag, 'supervisor');
    });

    it('Login Feirante', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: feirante.cpf,
          senha: '12345678',
        });
      assert.strictEqual(res.statusCode, 200);
      assert.isNotNull(res.body.token);
      assert.strictEqual(res.body.tag, 'feirante');
    });

    it('Admin senha errada', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: admin.cpf,
          senha: 'aaaaaa',
        });
      assert.strictEqual(res.statusCode, 401);
      assert.isUndefined(res.body.token);
      assert.isUndefined(res.body.tag);
    });

    it('Supervisor senha errada', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: supervisor.cpf,
          senha: 'aaaaaa',
        });
      assert.strictEqual(res.statusCode, 401);
      assert.isUndefined(res.body.token);
      assert.isUndefined(res.body.tag);
    });

    it('Feirante senha errada', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: feirante.cpf,
          senha: 'aaaaaa',
        });
      assert.strictEqual(res.statusCode, 401);
      assert.isUndefined(res.body.token);
      assert.isUndefined(res.body.tag);
    });

    it('CPF invalido', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: '1111111111',
          senha: '12345678',
        });
      assert.strictEqual(res.statusCode, 400);
    });

    it('Senha com menos de 6 dígitos', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .send({
          cpf: '58295846035',
          senha: '123',
        });
      assert.strictEqual(res.statusCode, 400);
    });
  });
});
