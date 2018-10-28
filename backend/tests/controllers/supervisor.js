const { assert } = require('chai');
const faker = require('faker');
const supervisorController = require('../../controllers/supervisor');
const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe.only('supervisor.js', () => {
  beforeEach(async () => {
    await models.supervisor.destroy({ where: {} });
  });

  describe('addSupervisor', () => {
    it('Cadastra um supervisor', async () => {
      const supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      assert.isNotNull(supervisor);
    });

    it('Não cadastra um supervisor com informação faltando', async () => {
      const supervisor = await supervisorController.addSupervisor(
        '58295846035',
        null,
        faker.name.firstName(),
        true,
      );
      assert.isNull(supervisor);
    });

    it('Não cadastra um supervisor repetido', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      assert.isNotNull(supervisor);

      supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      assert.isNull(supervisor);
    });

    it('Re-ativa um supervisor', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      assert.isNotNull(supervisor);

      const res = await supervisorController.deleteSupervisor(supervisor.cpf);
      assert.isNotNull(res);

      supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      assert.isNotNull(supervisor);
    });
  });

  describe('listSupervisor', () => {
    it('Retorna vazio se não existir supervisor', async () => {
      const supervisores = await supervisorController.listSupervisor();
      assert.lengthOf(supervisores, 0);
    });

    it('Retorna lista de supervisores', async () => {
      let supervisores = await supervisorController.listSupervisor();
      assert.lengthOf(supervisores, 0);

      const supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      supervisores = await supervisorController.listSupervisor();
      assert.lengthOf(supervisores, 1);
      assert.strictEqual(supervisores[0].cpf, supervisor.cpf);
    });

    it('Não lista supervisor inativo', async () => {
      let supervisores = await supervisorController.listSupervisor();
      assert.lengthOf(supervisores, 0);

      const supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      const supervisor2 = await supervisorController.addSupervisor(
        '83762032076',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );
      await supervisorController.deleteSupervisor(supervisor2.cpf);

      supervisores = await supervisorController.listSupervisor();
      assert.lengthOf(supervisores, 1);
      assert.strictEqual(supervisores[0].cpf, supervisor.cpf);
    });
  });

  describe('findSupervisorByCpf', () => {
    it('Retorna null se supervisor não existe', async () => {
      const supervisor = await supervisorController.findSupervisorByCpf('58295846035');
      assert.isNull(supervisor);
    });

    it('Retorna supervisor', async () => {
      const supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      const supervisorFind = await supervisorController.findSupervisorByCpf('58295846035');
      assert.isNotNull(supervisorFind);
      assert.strictEqual(supervisor.cpf, supervisorFind.cpf);
    });

    it('Retorna null se supervisor for inativo', async () => {
      const supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      await supervisorController.deleteSupervisor(supervisor.cpf);

      const supervisorFind = await supervisorController.findSupervisorByCpf('58295846035');
      assert.isNull(supervisorFind);
    });
  });

  describe('updateSupervisor', () => {
    it('Não atualiza supervisor que não existe', async () => {
      const supervisor = await supervisorController.updateSupervisor('58295846035', {
        nome: faker.name.firstName(),
        senha: faker.name.firstName(),
        is_adm: true,
      });
      assert.isNull(supervisor);
    });

    it('Não atualiza supervisor desativado', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      await supervisorController.deleteSupervisor(supervisor.cpf);

      supervisor = await supervisorController.updateSupervisor('58295846035', {
        nome: faker.name.firstName(),
        senha: faker.name.firstName(),
        is_adm: true,
      });
      assert.isNull(supervisor);
    });

    it('Não deixa atualizar status', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      supervisor = await supervisorController.updateSupervisor('58295846035', {
        status: false,
      });
      assert.isNull(supervisor);
    });

    it('Atualiza somente senha', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      supervisor = await supervisorController.updateSupervisor('58295846035', {
        senha: faker.name.firstName(),
      });
      assert.isNotNull(supervisor);
    });

    it('Atualiza todos os campos exceto senha', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      const novoNome = faker.name.firstName();

      supervisor = await supervisorController.updateSupervisor('58295846035', {
        nome: novoNome,
        is_adm: false,
      });
      assert.isNotNull(supervisor);
      assert.strictEqual(supervisor.nome, novoNome);
    });
  });

  describe('deleteSupervisor', () => {
    it('Não deleta supervisor que não existe', async () => {
      const supervisor = await supervisorController.deleteSupervisor('58295846035');
      assert.isNull(supervisor);
    });

    it('Não deleta supervisor desativado', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      await supervisorController.deleteSupervisor(supervisor.cpf);
      supervisor = await supervisorController.deleteSupervisor(supervisor.cpf);
      assert.isNull(supervisor);
    });

    it('Deleta supervisor', async () => {
      let supervisor = await supervisorController.addSupervisor(
        '58295846035',
        faker.name.firstName(),
        faker.name.firstName(),
        true,
      );

      supervisor = await supervisorController.deleteSupervisor(supervisor.cpf);
      assert.isNotNull(supervisor);

      supervisor = await supervisorController.findSupervisorByCpf(supervisor.cpf);
      assert.isNull(supervisor);
    });
  });
});
