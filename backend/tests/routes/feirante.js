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

const host = '/api/feirante/';

describe('feirante.js', () => {
  let tokenSupervisor;
  let feirante;
  let tokenAdmin;
  let tokenFeirante;
  let subcategoria;
  before(async () => {
    const admin = await supervisorController.addSupervisor(
      '89569380080',
      faker.name.firstName(),
      '1234',
      true,
    );

    const supervisor = await supervisorController.addSupervisor(
      '56919550040',
      faker.name.firstName(),
      '1234',
      false,
    );

    const categoria = await categoriaController.addCategoria('Alimento', false);
    subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
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
    tokenAdmin = (await loginController.login(admin.cpf, '1234')).token;
    tokenSupervisor = (await loginController.login(supervisor.cpf, '1234')).token;
  });

  after(async () => {
    await models.celula.destroy({ where: {} });
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
  });

  describe('POST /feirante', () => {
    it('Supervisor pode adicionar feirante', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '07281509057',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });
    it('Administrador pode adicionar feirante', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenAdmin)
        .send({
          cpf: '44174625000',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });

    it('Feirante não pode adicionar feirante', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenFeirante)
        .send({
          cpf: '16319981024',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 401);
    });

    it('Sem token não pode adicionar feirante', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', 'aaaa')
        .send({
          cpf: '39616904051',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 401);
    });

    it('Atributos faltando', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '07281509057',
          cnpj: '',
          /* nome: faker.name.firstName(), */
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 400);
    });

    it('Atributos faltando #2', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '07281509057',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            /* logradouro: faker.address.streetAddress(), */
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 400);
    });

    it('Atributos incorretos', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '07281509057',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: '', // faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 400);
    });

    it('Atributos opcionais', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '03042659003',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            /* CEP: '87.303-065', */
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });

    it('Subcategoria não existe', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '47668203044',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: 4,
        });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'subcategoria_nao_existe');
    });

    it('CPF existente', async () => {
      const res = await chai
        .request(app)
        .post(host)
        .set('token', tokenSupervisor)
        .send({
          cpf: '07281509057',
          cnpj: '',
          nome: faker.name.firstName(),
          rg: '509627249',
          senha: '123456',
          usa_ee: false,
          nome_fantasia: faker.name.firstName(),
          razao_social: faker.name.firstName(),
          comprimento_barraca: 4,
          largura_barraca: 4,
          endereco: {
            logradouro: faker.address.streetAddress(),
            bairro: faker.address.secondaryAddress(),
            numero: 100,
            CEP: '87.303-065',
          },
          voltagem_ee: 110,
          sub_categoria_id: subcategoria.id,
        });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cpf_existente');
    });
  });
  describe('GET /feirante', () => {
    it('Lista feirantes', async () => {
      const res = await chai
        .request(app)
        .get(host)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.lengthOf(res.body, 4);
      assert.strictEqual(res.body.filter(e => e.cpf === feirante.cpf)[0].rg, feirante.rg);
    });
  });
  describe('GET /feirante/:cpf', () => {
    it('CPF inválido', async () => {
      const res = await chai
        .request(app)
        .get(`${host}11111111111`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 400);
    });

    it('CPF não existente', async () => {
      const res = await chai
        .request(app)
        .get(`${host}93146729059`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cpf_nao_existente');
    });

    it('Retorna feirante pelo CPF', async () => {
      const res = await chai
        .request(app)
        .get(`${host}${feirante.cpf}`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.cpf, feirante.cpf);
    });
  });
  describe('PUT /feirante/:cpf', () => {
    it('CPF inválido', async () => {
      const res = await chai
        .request(app)
        .put(`${host}11111111111`)
        .set('token', tokenSupervisor)
        .send({ senha: '123456' });
      assert.strictEqual(res.statusCode, 400);
    });

    it('Atributo incorreto', async () => {
      const res = await chai
        .request(app)
        .put(`${host}${feirante.cpf}`)
        .set('token', tokenSupervisor)
        .send({ senha: '1234' });
      assert.strictEqual(res.statusCode, 400);
    });

    it('CPF não existe', async () => {
      const res = await chai
        .request(app)
        .put(`${host}91137616091`)
        .set('token', tokenSupervisor)
        .send({ senha: '123456' });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cpf_nao_existente');
    });

    it('Atualiza feirante', async () => {
      const novoNome = faker.name.firstName();
      let res = await chai
        .request(app)
        .put(`${host}${feirante.cpf}`)
        .set('token', tokenSupervisor)
        .send({ nome: novoNome });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      res = await chai
        .request(app)
        .get(`${host}${feirante.cpf}`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.nome, novoNome);
    });
  });
  describe('DELETE /feirante/:cpf', () => {
    it('CPF inválido', async () => {
      const res = await chai
        .request(app)
        .delete(`${host}11111111111`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 400);
    });
    it('CPF não existe', async () => {
      const res = await chai
        .request(app)
        .delete(`${host}91137616091`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cpf_nao_existente');
    });
    it('Remove supervisor', async () => {
      let res = await chai
        .request(app)
        .delete(`${host}${feirante.cpf}`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      res = await chai
        .request(app)
        .get(`${host}${feirante.cpf}`)
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cpf_nao_existente');
    });
  });
});
