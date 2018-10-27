const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const sinon = require('sinon');
const keys = require('../../config/keys.json');
const models = require('../../models');

chai.use(chaiHttp);

const app = require('../../app');

const feiranteController = require('../../controllers/feirante');
const supervisorController = require('../../controllers/supervisor');


after(() => {
  models.sequelize.close();
});

describe('Testando middleware validação JWT', () => {
  before(() => {
    models.feirante.destroy({ where: {} });
    models.supervisor.destroy({ where: {} });
  });

  describe('Testando validação feirante', () => {
    it('Não passa jwt nos headers', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-feirante')
        .set('token', '')
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt inválido', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-feirante')
        .set('token', `${jwt.sign('111.111.111-11', keys.jwt)}x`)
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt inválido 2', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-feirante')
        .set('token', jwt.sign('111.111.111-11', 'invalid_key'))
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt válido, porém feirante não existe', async () => {
      // Essa função abaixo é utilizada para forçar a função findFeiranteByCpf
      // a retornar qualquer valor desejado.
      // Dessa forma não precisa ficar criando entidades de teste no banco de dados
      // https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
      sinon.stub(feiranteController, 'findFeiranteByCpf').returns(null);
      const req = await chai
        .request(app)
        .post('/testes/token-feirante')
        .set('token', jwt.sign('111.111.111-11', keys.jwt))
        .send();

      sinon.restore();
      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt válido e feirante existe', async () => {
      sinon.stub(feiranteController, 'findFeiranteByCpf').returns({ cpf: '111.111.111-11' });

      const req = await chai
        .request(app)
        .post('/testes/token-feirante')
        .set('token', jwt.sign('111.111.111-11', keys.jwt))
        .send();

      sinon.restore();
      assert.strictEqual(req.status, 200);
      assert.strictEqual(req.text, '111.111.111-11');
    });
  });

  describe('Testando validação supervisor', () => {
    it('Não passa jwt nos headers', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-supervisor')
        .set('token', '')
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt inválido', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-supervisor')
        .set('token', `${jwt.sign('111.111.111-11', keys.jwt)}x`)
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt inválido 2', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-supervisor')
        .set('token', jwt.sign('111.111.111-11', 'invalid_key'))
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt válido, porém supervisor não existe', async () => {
      // Essa função abaixo é utilizada para forçar a função findFeiranteByCpf
      // a retornar qualquer valor desejado.
      // Dessa forma não precisa ficar criando entidades de teste no banco de dados
      // https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
      sinon.stub(supervisorController, 'findSupervisorByCpf').returns(null);
      const req = await chai
        .request(app)
        .post('/testes/token-supervisor')
        .set('token', jwt.sign('111.111.111-11', keys.jwt))
        .send();

      sinon.restore();
      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt válido e supervisor existe', async () => {
      sinon.stub(supervisorController, 'findSupervisorByCpf').returns({ cpf: '111.111.111-11' });

      const req = await chai
        .request(app)
        .post('/testes/token-supervisor')
        .set('token', jwt.sign('111.111.111-11', keys.jwt))
        .send();

      sinon.restore();
      assert.strictEqual(req.status, 200);
      assert.strictEqual(req.text, '111.111.111-11');
    });
  });



  describe('Testando validação administrador', () => {
    it('Não passa jwt nos headers', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-admin')
        .set('token', '')
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt inválido', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-admin')
        .set('token', `${jwt.sign('111.111.111-11', keys.jwt)}x`)
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt inválido 2', async () => {
      const req = await chai
        .request(app)
        .post('/testes/token-admin')
        .set('token', jwt.sign('111.111.111-11', 'invalid_key'))
        .send();

      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt válido, porém admininstrador não existe', async () => {
      // Essa função abaixo é utilizada para forçar a função findFeiranteByCpf
      // a retornar qualquer valor desejado.
      // Dessa forma não precisa ficar criando entidades de teste no banco de dados
      // https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
      sinon.stub(supervisorController, 'findSupervisorByCpf').returns(null);
      const req = await chai
        .request(app)
        .post('/testes/token-admin')
        .set('token', jwt.sign('111.111.111-11', keys.jwt))
        .send();

      sinon.restore();
      assert.strictEqual(req.status, 401);
    });

    it('Passa jwt válido e admin existe', async () => {
      sinon.stub(supervisorController, 'findSupervisorByCpf').returns({ cpf: '111.111.111-11' });

      const req = await chai
        .request(app)
        .post('/testes/token-admin')
        .set('token', jwt.sign('111.111.111-11', keys.jwt))
        .send();

      sinon.restore();
      assert.strictEqual(req.status, 200);
      assert.strictEqual(req.text, '111.111.111-11');
    });
  });
});
