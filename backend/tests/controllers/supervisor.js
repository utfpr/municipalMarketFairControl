const chance = require('chance').Chance();
const { assert } = require('chai');
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
    assert.isTrue(res);

    res = await supervisorController.addSupervisor('11111111112', 'Daniel Ourival', '1234', false);
    assert.isTrue(res);

    res = await supervisorController.addSupervisor(
      '11111111113',
      'Demervaldo Batista',
      '1234',
      false,
    );
    assert.isTrue(res);

    res = await supervisorController.addSupervisor('11111111114', 'Jorel', '1234', false);
    assert.isTrue(res);
  });

  it('Não cadastra um supervisor existente', async () => {
    const res = await supervisorController.addSupervisor(
      '11111111111',
      'Carlos Sumaré',
      '1234',
      false,
    );
    assert.isFalse(res);
  });

  it('Não cadastra um supervisor com informações faltando', async () => {
    const res = await supervisorController.addSupervisor('11111111111', null, '1234', false);
    assert.isFalse(res);
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
    assert.isFalse(s1);
  });

  it('Deleta supervisor', async () => {
    let res = await supervisorController.findSupervisorByCpf('11111111114');
    assert.isNotFalse(res);

    res = await supervisorController.deleteSupervisor('11111111114');
    assert.isTrue(res);

    res = await supervisorController.findSupervisorByCpf('11111111114');
    assert.isFalse(res);
  });

  it('Não delete supervisor que já foi deletado', async () => {
    const res = await supervisorController.deleteSupervisor('11111111114');
    assert.isFalse(res);
  });
});
