const chance = require('chance').Chance();
const { assert } = require('chai');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../../config/keys.json');
const loginController = require('../../controllers/login');
const supervisorController = require('../../controllers/supervisor');
const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe('Teste controller login', () => {
  before(async () => {
    await models.supervisor.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });

    const categoria = await models.categoria.create({ nome: 'Categoria', need_cnpj: false });
    const sub = await categoria.createSubCategoria({ nome: 'SubCategoria' });

    await models.feirante.create({
      cpf: '22222222222',
      usa_ee: false,
      nome_fantasia: 'aaa',
      razao_social: 'aaa',
      comprimento_barraca: 4,
      largura_barraca: 4,
      endereco: 'aaa',
      sub_categoria_id: sub.id,
      senha: await bcrypt.hash('4321', 10),
    });

    await models.feirante.create({
      cpf: '22222222223',
      usa_ee: false,
      nome_fantasia: 'aaa',
      razao_social: 'aaa',
      comprimento_barraca: 4,
      largura_barraca: 4,
      endereco: 'aaa',
      sub_categoria_id: sub.id,
      senha: await bcrypt.hash('4321', 10),
    });

    await models.feirante.create({
      cpf: '22222222224',
      usa_ee: false,
      nome_fantasia: 'aaa',
      razao_social: 'aaa',
      comprimento_barraca: 4,
      largura_barraca: 4,
      endereco: 'aaa',
      sub_categoria_id: sub.id,
      senha: await bcrypt.hash('54321', 10),
    });

    await supervisorController.addSupervisor('11111111111', 'Nome', '1234', false);
    await supervisorController.addSupervisor('11111111112', 'Nome', '12345', false);

    // todo: criar feirante
  });

  it('Faz login corretamente (supervisor)', async () => {
    const token = await loginController.login('11111111111', '1234');
    assert.isNotNull(token);
    const decoded = await jwt.verify(token.token, keys.jwt);
    assert.strictEqual(decoded, '11111111111');
  });

  it('Não faz login com senha incorreta (supervisor)', async () => {
    const token = await loginController.login('11111111111', '12345');
    assert.isNull(token);
  });

  it('Não faz login com cpf incorreto (supervisor)', async () => {
    const token = await loginController.login('22222222222', '1234');
    assert.isNull(token);
  });

  it('Não faz login com cpf inexistente (supervisor)', async () => {
    const token = await loginController.login('11111111117', '1234');
    assert.isNull(token);
  });

  it('Faz login corretamente (feirante)', async () => {
    const token = await loginController.login('22222222222', '4321');
    assert.isNotNull(token);
    const decoded = await jwt.verify(token.token, keys.jwt);
    assert.strictEqual(decoded, '22222222222');
  });

  it('Não faz login com senha incorreta (feirante)', async () => {
    const token = await loginController.login('22222222223', '54321');
    assert.isNull(token);
  });

  it('Não faz login com cpf incorreto (feirante)', async () => {
    const token = await loginController.login('11111111111', '4321');
    assert.isNull(token);
  });

  it('Não faz login com cpf inexistente (feirante)', async () => {
    const token = await loginController.login('22222222224', '4321');
    assert.isNull(token);
  });
});
