const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const sinon = require('sinon');
const supervisorController = require('../../controllers/supervisor');
const categoriaController = require('../../controllers/categoria');
const feiranteController = require('../../controllers/feirante');
const feiraController = require('../../controllers/feira');
const celulaController = require('../../controllers/celula');
const loginController = require('../../controllers/login');
const participaController = require('../../controllers/participa');
const app = require('../../app');
const models = require('../../models');
const { proximaSexta } = require('../../controllers/utils');

const { assert } = chai;

chai.use(chaiHttp);

describe.skip('participa.js', () => {
  let tokenFeirante;
  let feirante;
  let feirante2;
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

    feirante2 = await feiranteController.addFeirante(
      '81176013033',
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

  after(async () => {
    await models.feira.destroy({ where: {} });
    await models.celula.destroy({ where: {} });
    await models.participa.destroy({ where: {} });
    await models.categoria.destroy({ where: {} });
    await models.subcategoria.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
    await models.supervisor.destroy({ where: {} });
    // await models.sequelize.close();
  });

  afterEach(async () => {
    await models.feira.destroy({ where: {} });
    await models.celula.destroy({ where: {} });
    await models.participa.destroy({ where: {} });
    // await models.sequelize.close();
  });

  describe('GET /participa/confirmados', () => {
    it('Retorna "feira_invalida" se não existe feira atual', async () => {
      const res = await chai
        .request(app)
        .get('/participa/confirmados')
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_invalida');
    });
    it('Retorna array vazio se não existem feirantes confirmados', async () => {
      await feiraController.addFeira(proximaSexta());
      const res = await chai
        .request(app)
        .get('/participa/confirmados')
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.lengthOf(res.body, 0);
    });
    it('Retorna feirantes confirmados', async () => {
      await feiraController.addFeira(proximaSexta());
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      const res = await chai
        .request(app)
        .get('/participa/confirmados')
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 200);
      assert.lengthOf(res.body, 1);
      assert.strictEqual(res.body[0].feirante.cpf, feirante.cpf);
    });
    it('Somente supervisor pode listar feirantes confirmados', async () => {
      await feiraController.addFeira(proximaSexta());
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      const res = await chai
        .request(app)
        .get('/participa/confirmados')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 401);
    });
  });

  describe('POST /participa/confirma', () => {
    it('Retorna "feira_invalida" se não existe feira atual', async () => {
      const res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 1 });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_invalida');
    });
    it('Retorna erro 400 se passar periodo inválido/não passar', async () => {
      await feiraController.addFeira(proximaSexta());
      let res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 5 });
      assert.strictEqual(res.statusCode, 400);

      res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodoo: 2 });
      assert.strictEqual(res.statusCode, 400);
    });
    it('Retorna "confirmacao_fechada" se fechou o periodo de confirmação', async () => {
      const data = proximaSexta();
      await feiraController.addFeira(data);

      data.setDate(data.getDate() + 1);

      const clock = sinon.useFakeTimers(data);
      const res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 1 });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'confirmacao_fechada');

      clock.restore();
    });
    it('Retorna "periodo_invalido" se período não condiz com o da celula reservada', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 2 });
      await celulaController.updateCelula(1, { cpf_feirante: feirante.cpf });
      const res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 1 });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'periodo_invalido');
    });
    it('Retorna "ok" se confirmar presença', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 2 });
      await celulaController.updateCelula(1, { cpf_feirante: feirante.cpf });
      const res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 2 });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });
    it('Retorna "ja_confirmado" se feirante já confirmou', async () => {
      await feiraController.addFeira(proximaSexta());
      let res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 1 });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenFeirante)
        .send({ periodo: 1 });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ja_confirmado');
    });
    it('Somente feirante pode confirmar presença', async () => {
      await feiraController.addFeira(proximaSexta());
      const res = await chai
        .request(app)
        .post('/participa/confirma')
        .set('token', tokenSupervisor)
        .send({ periodo: 1 });
      assert.strictEqual(res.statusCode, 401);
    });
  });

  describe('POST /participa/cancela', () => {
    it('Retorna "feira_invalida" se não existe feira atual', async () => {
      const res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_invalida');
    });
    it('Retorna "cancelamento_fechado" se fechou o periodo de cancelamento', async () => {
      const data = proximaSexta();
      await feiraController.addFeira(data);

      data.setDate(data.getDate() + 1);
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      const clock = sinon.useFakeTimers(data);
      const res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenFeirante);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'cancelamento_fechado');

      clock.restore();
    });

    it('Retorna "nao_confirmado" se não está confirmado', async () => {
      await feiraController.addFeira(proximaSexta());
      // await participaController.confirmaPresencaFeiraAtual(feirante.cpf);
      const res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'nao_confirmado');
    });

    it('Retorna "nao_confirmado" se feirante já cancelou', async () => {
      await feiraController.addFeira(proximaSexta());
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      let res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'nao_confirmado');
    });

    it('Retorna "ok" se cancelou', async () => {
      await feiraController.addFeira(proximaSexta());
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      const res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenFeirante);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');
    });

    it('Somente feirante pode cancelar presença', async () => {
      await feiraController.addFeira(proximaSexta());
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      const res = await chai
        .request(app)
        .post('/participa/cancela')
        .set('token', tokenSupervisor);
      assert.strictEqual(res.statusCode, 401);
    });
  });

  describe('POST /participa/posicao', () => {
    it('Retorna "feira_invalida" se não existe feira atual', async () => {
      await models.celula.create({ id: 1, periodo: 1 });
      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 1, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feira_invalida');
    });
    it('Retorna "feirante_invalido" se feirante não existe/não está confirmado', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      let res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 1, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feirante_invalido');

      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);

      res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: '61799227057', celula_id: 1, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'feirante_invalido');
    });
    it('Retorna "celula_invalida" se celula não existe', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 2, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'celula_invalida');
    });
    it('Retorna "periodo_invalido" se período não condiz com o da celula', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 1, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'periodo_invalido');
    });
    it('Retorna "ok" se limpar posição feirante', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      const ret = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(ret);

      let dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);
      // assert.isNotNull(dadosCelula.cpfFeirante);

      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: null, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);
      assert.isNull(dadosCelula.cpfFeirante);
    });
    it('Retorna "ok" se atualizar posicao (celula livre)', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      await models.celula.create({ id: 2, periodo: 1 });
      const ret = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(ret);

      let dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);

      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 2, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);
      assert.isNull(dadosCelula.cpfFeirante);

      dadosCelula = await participaController.getDadosCelulaFeiraAtual(2);
      assert.isNotNull(dadosCelula.cpfFeirante);
      assert.strictEqual(dadosCelula.cpfFeirante, feirante.cpf);
    });
    it('Retorna "celula_ocupada" se celula estiver ocupada', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      await models.celula.create({ id: 2, periodo: 1 });
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      await participaController.confirmaPresencaFeiraAtual(feirante2.cpf, 1);

      await participaController.setPosicaoFeiranteFeiraAtual(feirante.cpf, 1, false);
      await participaController.setPosicaoFeiranteFeiraAtual(feirante2.cpf, 2, false);

      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 2, force: false });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'celula_ocupada');

      let dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);
      assert.isNotNull(dadosCelula.cpfFeirante);
      assert.strictEqual(dadosCelula.cpfFeirante, feirante.cpf);

      dadosCelula = await participaController.getDadosCelulaFeiraAtual(2);
      assert.isNotNull(dadosCelula.cpfFeirante);
      assert.strictEqual(dadosCelula.cpfFeirante, feirante2.cpf);
    });
    it('Retorna "ok" se atualizar posicao com force=true (celula ocupada)', async () => {
      await feiraController.addFeira(proximaSexta());
      await models.celula.create({ id: 1, periodo: 1 });
      await models.celula.create({ id: 2, periodo: 1 });
      await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      await participaController.confirmaPresencaFeiraAtual(feirante2.cpf, 2);

      await participaController.setPosicaoFeiranteFeiraAtual(feirante.cpf, 1, false);
      await participaController.setPosicaoFeiranteFeiraAtual(feirante2.cpf, 2, false);

      const res = await chai
        .request(app)
        .post('/participa/posicao')
        .set('token', tokenSupervisor)
        .send({ cpf_feirante: feirante.cpf, celula_id: 2, force: true });
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.msg, 'ok');

      let dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);
      assert.isNull(dadosCelula.cpfFeirante);

      dadosCelula = await participaController.getDadosCelulaFeiraAtual(2);
      assert.isNotNull(dadosCelula.cpfFeirante);
      assert.strictEqual(dadosCelula.cpfFeirante, feirante.cpf);
    });
  });
});
