var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../app'); 
const faker = require('faker');
const supervisorController = require('../../controllers/supervisor');
const feiranteController = require('../../controllers/feirante');
const categoriaController = require('../../controllers/categoria');
const subCategoriaController = require('../../controllers/subcategoria');
const loginController = require('../../controllers/login');
const models = require('../../models');
const { assert } = chai;

chai.use(chaiHttp);

describe("Rota Login", () => {
  let tokenSupervisor;
  let feirante;
  let tokenAdmin;
  let tokenFeirante;
  let subcategoria;
  let categoria;
  before(async () => {
    const admin = await supervisorController.addSupervisor(
      '89569380080',
      faker.name.firstName(),
      '123456',
      true,
    );

    const supervisor = await supervisorController.addSupervisor(
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

    tokenFeirante = (await loginController.login(feirante.cpf, '12345678')).token;
    tokenAdmin = (await loginController.login(admin.cpf, '123456')).token;
    tokenSupervisor = (await loginController.login(supervisor.cpf, '1234567')).token;

  });

  after(async () => {
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
  });

  describe("POST /login", () => {
    it('Login Admin', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `89569380080`,
          senha: `123456`,
        });
      assert.strictEqual(res.statusCode, 200);
      //assert.strictEqual(res.body.msg, tokenFeirante);
    });

    it('Login Supervisor', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `56919550040`,
          senha: `1234567`,
        });
      assert.strictEqual(res.statusCode, 200);
      //assert.strictEqual(res.body.msg, tokenFeirante);
    });

    it('Login Feirante', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `58295846035`,
          senha: `12345678`,
        });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg.token, tokenFeirante);
    });

    it('Admin senha errada', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `58295846035`,
          senha: `araawefewaaweva`,
        });
      assert.strictEqual(res.statusCode, 401);
      //assert.strictEqual(res.body.msg, tokenFeirante);
    });

    it('Supervisor senha errada', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `58295846035`,
          senha: `awffeaaeva`,
        });
      assert.strictEqual(res.statusCode, 401);
      //assert.strictEqual(res.body.msg, tokenFeirante);
    });

    it('Feirante senha errada', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `58295846035`,
          senha: `aweaeafev`,
        });
      assert.strictEqual(res.statusCode, 401);
      //assert.strictEqual(res.body.msg, tokenFeirante);
    });

    it('CPF invalido', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `1111111111`,
          senha: `12345678`,
        });
      assert.strictEqual(res.statusCode, 400);
    });
    
    it('Senha com menos de 6 dígitos', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          cpf: `58295846035`,
          senha: '123',
        });
      assert.strictEqual(res.statusCode, 400);
    }); 
  });
});
