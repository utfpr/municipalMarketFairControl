const { assert } = require('chai');
const bcrypt = require('bcrypt');
const supervisorController = require('../../controllers/supervisor');
const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe('Teste controller supervisor', () => {
  before(() => {
    models.supervisor.destroy({ where: {} });
  });

  it('Cadastra alguns supervisores', async () => {
    let res = await supervisorController.addSupervisor(
      '11111111111',
      'Carlos Sumaré',
      '1234',
      true,
    );
    assert.isNotNull(res);

    res = await supervisorController.addSupervisor('11111111112', 'Daniel Ourival', '1234', false);
    assert.isNotNull(res);

    res = await supervisorController.addSupervisor(
      '11111111113',
      'Demervaldo Batista',
      '1234',
      false,
    );
    assert.isNotNull(res);

    res = await supervisorController.addSupervisor('11111111114', 'Jorel', '1234', false);
    assert.isNotNull(res);
  });

  it('Não cadastra um supervisor existente', async () => {
    const res = await supervisorController.addSupervisor(
      '11111111111',
      'Carlos Sumaré',
      '1234',
      false,
    );
    assert.isNull(res);
  });

  it('Não cadastra um supervisor com informações faltando', async () => {
    const res = await supervisorController.addSupervisor('11111111111', null, '1234', false);
    assert.isNull(res);
  });

  it('Lista supervisores', async () => {
    const supervisores = await supervisorController.listSupervisor();
    assert.lengthOf(supervisores, 4);

    assert.deepEqual(supervisores.filter(el => el.cpf === '11111111111')[0], {
      cpf: '11111111111',
      nome: 'Carlos Sumaré',
      is_adm: 1,
    });

    assert.deepEqual(supervisores.filter(el => el.cpf === '11111111112')[0], {
      cpf: '11111111112',
      nome: 'Daniel Ourival',
      is_adm: 0,
    });

    assert.deepEqual(supervisores.filter(el => el.cpf === '11111111113')[0], {
      cpf: '11111111113',
      nome: 'Demervaldo Batista',
      is_adm: 0,
    });

    assert.deepEqual(supervisores.filter(el => el.cpf === '11111111114')[0], {
      cpf: '11111111114',
      nome: 'Jorel',
      is_adm: 0,
    });
  });

  it('Busca supervisor pelo cpf - existente', async () => {
    const s1 = await supervisorController.findSupervisorByCpf('11111111114');
    assert.deepEqual(s1, {
      cpf: '11111111114',
      nome: 'Jorel',
      is_adm: 0,
    });
  });

  it('Busca supervisor pelo cpf - inexistente', async () => {
    const s1 = await supervisorController.findSupervisorByCpf('11111111116');
    assert.isNull(s1);
  });

  it('Atualiza supervisor', async () => {
    let supervisor = await supervisorController.findSupervisorByCpf('11111111114');
    assert.strictEqual(supervisor.nome, 'Jorel');

    const res = await supervisorController.updateSupervisor('11111111114', { nome: 'Jorel2' });
    assert.isNotNull(res);

    supervisor = await supervisorController.findSupervisorByCpf('11111111114');
    assert.strictEqual(supervisor.nome, 'Jorel2');
  });

  it('Atualiza supervisor (vários campos)', async () => {
    let supervisor = await supervisorController.findSupervisorByCpf('11111111114');
    assert.strictEqual(supervisor.nome, 'Jorel2');
    assert.strictEqual(supervisor.is_adm, 0);

    const res = await supervisorController.updateSupervisor('11111111114', {
      nome: 'Jorel3',
      is_adm: 1,
    });
    assert.isNotNull(res);

    supervisor = await supervisorController.findSupervisorByCpf('11111111114');
    assert.strictEqual(supervisor.nome, 'Jorel3');
    assert.strictEqual(supervisor.is_adm, 1);
  });

  it('Atualiza senha supervisor', async () => {
    let supervisor = await supervisorController.findSupervisorByCpf('11111111114');

    const res = await supervisorController.updateSupervisor('11111111114', {
      senha: 'nova_senha',
    });
    assert.isNotNull(res);

    supervisor = await models.supervisor.findOne({ where: { cpf: '11111111114' } });
    assert.isTrue(await bcrypt.compare('nova_senha', supervisor.senha));
  });

  it('Não deixa atualizar status supervisor', async () => {
    const res = await supervisorController.updateSupervisor('11111111114', {
      status: 0,
    });
    assert.isNotNull(res);

    const supervisor = await supervisorController.findSupervisorByCpf('11111111114');
    assert.isNotNull(supervisor);
  });

  it('Não atualiza supervisor inexistente', async () => {
    const res = await supervisorController.updateSupervisor('11111111118', { nome: 'Jorel2' });
    assert.isNull(res);
  });

  it('Deleta supervisor', async () => {
    let res = await supervisorController.findSupervisorByCpf('11111111114');
    assert.isNotNull(res);

    res = await supervisorController.deleteSupervisor('11111111114');
    assert.isNotNull(res);

    res = await supervisorController.findSupervisorByCpf('11111111114');
    assert.isNull(res);
  });

  it('Não delete supervisor que já foi deletado', async () => {
    const res = await supervisorController.deleteSupervisor('11111111114');
    assert.isNull(res);
  });

  it('Retorna um array vazio quando não tem supervisor', async () => {
    await models.supervisor.destroy({ where: {} });
    const supervisores = await supervisorController.listSupervisor();
    assert.lengthOf(supervisores, 0);
  });
});
