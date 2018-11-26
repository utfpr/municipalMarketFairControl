const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const supervisorController = require('../../controllers/supervisor');
const categoriaController = require('../../controllers/categoria');
const feiranteController = require('../../controllers/feirante');
const loginController = require('../../controllers/login');
const feiraController = require('../../controllers/feira');
const app = require('../../app');
const models = require('../../models');
const { amanha } = require('../../controllers/utils');

const { assert } = chai;

chai.use(chaiHttp);

const host = '/api/feira/';

describe('feira.js', () => {
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

    tokenFeirante = (await loginController.login(feirante.cpf, '1234')).token;
    tokenSupervisor = (await loginController.login(supervisor.cpf, '1234')).token;
  });

  beforeEach(() => {
    models.feira.destroy({ where: {} });
  });

  after(async () => {
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
    await models.feira.destroy({ where: {} });
  });

  describe('GET /feira/info', () => {
    it('Feirante pode buscar info feira atual', async () => {
      await feiraController.addFeira(amanha());
      const res = await chai
        .request(app)
        .get(`${host}info`)
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(
        res.body.data,
        amanha()
          .toISOString()
          .split('T')[0],
      );
    });

    it('Supervisor pode buscar info feira atual', async () => {
      await feiraController.addFeira(amanha());
      const res = await chai
        .request(app)
        .get(`${host}info`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(
        res.body.data,
        amanha()
          .toISOString()
          .split('T')[0],
      );
    });

    it('Sem token não pode buscar info feira atual', async () => {
      await feiraController.addFeira(amanha());
      const res = await chai
        .request(app)
        .get(`${host}info`)
        .set('token', '');
      assert.strictEqual(res.statusCode, 401);
    });

    it('Retorna "feira_invalida" se não existir feira atual', async () => {
      const res = await chai
        .request(app)
        .get(`${host}info`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_invalida');
    });
  });

  describe('POST /feira', () => {
    it('Feirante não pode adicionar feira', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenFeirante);

      assert.strictEqual(res.statusCode, 401);
    });

    it('Retorna erro se data for inválida/faltar', async () => {
      let res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({});
      assert.strictEqual(res.statusCode, 400);

      res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({ data: '01/01//2019' });
      assert.strictEqual(res.statusCode, 400);
    });

    it('Não permite adicionar feira em data anterior a atual', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({ data: '01/01/2018' });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'data_nao_permitida');
    });

    it('Adiciona feira', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({ data: '31/12/2050' });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });
  });

  describe('POST /feira/cancelar', () => {
    it('Feirante não pode cancelar feira', async () => {
      await feiraController.addFeira(amanha());
      const res = await chai
        .request(app)
        .post(`${host}cancelar`)
        .set('token', tokenFeirante);

      assert.strictEqual(res.statusCode, 401);
    });
    it('Não pode cancelar se feira não existe', async () => {
      const res = await chai
        .request(app)
        .post(`${host}cancelar`)
        .set('token', tokenSupervisor);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_nao_cancelada');
    });
    it('Não pode cancelar se feira já foi cancelada', async () => {
      await feiraController.addFeira(amanha());
      await feiraController.cancelaFeiraAtual();

      const res = await chai
        .request(app)
        .post(`${host}cancelar`)
        .set('token', tokenSupervisor);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_nao_cancelada');
    });
    it('Cancela feira', async () => {
      await feiraController.addFeira(amanha());

      const res = await chai
        .request(app)
        .post(`${host}cancelar`)
        .set('token', tokenSupervisor);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });
  });
});
