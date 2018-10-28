const { assert } = require('chai');
const faker = require('faker');

const categoriaController = require('../../controllers/categoria');
const feiranteController = require('../../controllers/feirante');
const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe('feirante.js', () => {
  let subcategoria;

  before(async () => {
    const categoria = await categoriaController.addCategoria('Alimento', false);
    subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
  });

  beforeEach(async () => {
    await models.endereco.destroy({ where: {} });
    await models.feirante.destroy({ where: {} });
  });

  describe('addFeirante', () => {
    it('Não cadastra feirante sem endereço', async () => {
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
        true,
        faker.name.firstName(),
        faker.name.firstName(),
        4,
        4,
        {},
        110,
        subcategoria.id,
      );
      assert.isNull(feirante);
    });

    it('Não cadastra um feirante com subcategoria inválida', async () => {
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
        337,
      );
      assert.isNull(feirante);
    });

    it('Cadastra um feirante', async () => {
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
      assert.isNotNull(feirante);
    });

    it('Não cadastra um feirante com informação faltando', async () => {
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        null,
        '',
        faker.name.firstName(),
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
      assert.isNull(feirante);
    });

    it('Não cadastra um feirante repetido', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
      assert.isNotNull(feirante);

      feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
      assert.isNull(feirante);
    });

    it('Re-ativa um feirante', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
      assert.isNotNull(feirante);

      const res = await feiranteController.deleteFeirante(feirante.cpf);
      assert.isNotNull(res);

      feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
      assert.isNotNull(feirante);
    });
  });

  describe('listFeirante', () => {
    it('Retorna vazio se não existir feirante', async () => {
      const supervisores = await feiranteController.listFeirante();
      assert.lengthOf(supervisores, 0);
    });

    it('Retorna lista de feirantes', async () => {
      let feirantes = await feiranteController.listFeirante();
      assert.lengthOf(feirantes, 0);

      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      feirantes = await feiranteController.listFeirante();
      assert.lengthOf(feirantes, 1);
      assert.strictEqual(feirantes[0].cpf, feirante.cpf);
      assert.strictEqual(feirantes[0].endereco.numero, 100);
    });

    it('Não lista feirante inativo', async () => {
      let supervisores = await feiranteController.listFeirante();
      assert.lengthOf(supervisores, 0);

      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      const feirante2 = await feiranteController.addFeirante(
        '75191649001',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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
      await feiranteController.deleteFeirante(feirante2.cpf);

      supervisores = await feiranteController.listFeirante();
      assert.lengthOf(supervisores, 1);
      assert.strictEqual(supervisores[0].cpf, feirante.cpf);
    });
  });

  describe('findFeiranteByCpf', () => {
    it('Retorna null se feirante não existe', async () => {
      const feirante = await feiranteController.findFeiranteByCpf('58295846035');
      assert.isNull(feirante);
    });

    it('Retorna feirante', async () => {
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      const feiranteFind = await feiranteController.findFeiranteByCpf('58295846035');
      assert.isNotNull(feiranteFind);
      assert.strictEqual(feirante.cpf, feiranteFind.cpf);
    });

    it('Retorna null se feirante for inativo', async () => {
      const feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      await feiranteController.deleteFeirante(feirante.cpf);

      const feiranteFind = await feiranteController.findFeiranteByCpf('58295846035');
      assert.isNull(feiranteFind);
    });
  });

  describe('updateSupervisor', () => {
    it('Não atualiza feirante que não existe', async () => {
      const feirante = await feiranteController.updateFeirante('58295846035', {
        rg: '469964807',
        nome: faker.name.firstName(),
        cnpj: '',
        usa_ee: true,
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
      assert.isNull(feirante);
    });

    it('Não atualiza feirante desativado', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      await feiranteController.deleteFeirante(feirante.cpf);

      feirante = await feiranteController.updateFeirante('58295846035', {
        rg: '469964807',
        nome: faker.name.firstName(),
        cnpj: '',
        usa_ee: true,
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
      assert.isNull(feirante);
    });

    it('Não deixa atualizar status', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      feirante = await feiranteController.updateFeirante('58295846035', {
        status: false,
      });
      assert.isNull(feirante);
    });

    it('Atualiza somente senha', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      feirante = await feiranteController.updateFeirante('58295846035', {
        senha: faker.name.firstName(),
      });
      assert.isNotNull(feirante);
    });

    it('Atualiza somente endereço', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      const novoCep = '87.303-000';

      feirante = await feiranteController.updateFeirante('58295846035', {
        endereco: {
          CEP: novoCep,
        },
      });
      assert.isNotNull(feirante);
      assert.strictEqual(feirante.endereco.CEP, novoCep);
    });

    it('Atualiza endereço e mais informações', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      const novoNomeFantasia = faker.name.firstName();
      const novoCep = '87.303-000';
      const novoNumero = 200;

      feirante = await feiranteController.updateFeirante('58295846035', {
        nome_fantasia: novoNomeFantasia,
        endereco: {
          CEP: novoCep,
          numero: novoNumero,
        },
      });
      assert.isNotNull(feirante);
      assert.strictEqual(feirante.endereco.CEP, novoCep);
      assert.strictEqual(feirante.endereco.numero, novoNumero);
      assert.strictEqual(feirante.nome_fantasia, novoNomeFantasia);
    });
  });

  describe('deleteFeirante', () => {
    it('Não deleta feirante que não existe', async () => {
      const feirante = await feiranteController.deleteFeirante('58295846035');
      assert.isNull(feirante);
    });

    it('Não deleta feirante desativado', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      await feiranteController.deleteFeirante(feirante.cpf);
      feirante = await feiranteController.deleteFeirante(feirante.cpf);
      assert.isNull(feirante);
    });

    it('Deleta feirante', async () => {
      let feirante = await feiranteController.addFeirante(
        '58295846035',
        '469964807',
        faker.name.firstName(),
        '',
        faker.name.firstName(),
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

      feirante = await feiranteController.deleteFeirante(feirante.cpf);
      assert.isNotNull(feirante);

      feirante = await feiranteController.findFeiranteByCpf(feirante.cpf);
      assert.isNull(feirante);
    });
  });
});
