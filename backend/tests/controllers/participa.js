const { assert } = require('chai');
const faker = require('faker');
const sinon = require('sinon');

const models = require('../../models');
const feiranteController = require('../../controllers/feirante');
const feiraController = require('../../controllers/feira');
const categoriaController = require('../../controllers/categoria');
const participaController = require('../../controllers/participa');
const { amanha, proximaSexta } = require('../../controllers/utils');

describe.skip('participa.js', () => {
  let feirante;

  before(async () => {
    const categoria = await categoriaController.addCategoria('Alimento', false);
    const subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
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
  });

  beforeEach(async () => {
    await models.participa.destroy({ where: {} });
    await models.feira.destroy({ where: {} });
    await models.celula.destroy({ where: {} });
  });

  after(() => {
    models.participa.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.endereco.destroy({ where: {} });
    models.feirante.destroy({ where: {} });
    models.celula.destroy({ where: {} });
  });

  describe('listFeirantesConfirmados', () => {
    it('Retorna null se feira não existe', async () => {
      const confirmados = await participaController.listFeirantesConfirmados(amanha());
      assert.isNull(confirmados);
    });
    it('Retorna array vazio se não existem feirantes confirmados', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);
      const confirmados = await participaController.listFeirantesConfirmados(amanha());
      assert.lengthOf(confirmados, 0);
    });
    it('Retorna array de feirantes confirmados', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      let confirmados = await participaController.listFeirantesConfirmados(new Date(feira.data));
      assert.lengthOf(confirmados, 0);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(confirmacao);

      confirmados = await participaController.listFeirantesConfirmados(new Date(feira.data));
      assert.lengthOf(confirmados, 1);
      assert.strictEqual(confirmados[0].feirante.cpf, feirante.cpf);
    });
  });
  describe('listFeirantesConfirmadosFeiraAtual', () => {
    it('Retorna null se não existe feira na semana', async () => {
      const confirmados = await participaController.listFeirantesConfirmadosFeiraAtual();
      assert.isNull(confirmados);
    });
    it('Retorna array vazio se não existem feirantes confirmados na feira da semana', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);
      const confirmados = await participaController.listFeirantesConfirmadosFeiraAtual();
      assert.lengthOf(confirmados, 0);
    });
    it('Retorna array de feirantes confirmados', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      let confirmados = await participaController.listFeirantesConfirmadosFeiraAtual();
      assert.lengthOf(confirmados, 0);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(confirmacao);

      confirmados = await participaController.listFeirantesConfirmadosFeiraAtual();
      assert.lengthOf(confirmados, 1);
      assert.strictEqual(confirmados[0].feirante.cpf, feirante.cpf);
    });
  });

  describe('confirmaPresencaFeiraAtual', () => {
    it('Retorna null se não existe feira atual', async () => {
      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNull(confirmacao);
    });
    it('Retorna null se feirante não existe', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual('33608124098', 1);
      assert.isNull(confirmacao);
    });
    it('Retorna null se feirante já foi confirmado', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      let confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(confirmacao);

      confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNull(confirmacao);
    });
    it('Retorna null se período é inválido', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 4);
      assert.isNull(confirmacao);
    });
    it('Retorna null se período é diferente do período da celula reservada', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      await models.celula.create({ id: 1, periodo: 1, cpf_feirante: feirante.cpf });

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      assert.isNull(confirmacao);
    });
    it('Não deixa confirmar presença depois da data limite', async () => {
      let clock = sinon.useFakeTimers(new Date('10-29-2018'));
      const feira = await feiraController.addFeira(proximaSexta());
      assert.isNotNull(feira);
      clock.restore();

      const datePerdeuPlayboy = new Date('11-02-2018');
      datePerdeuPlayboy.setUTCHours(18);
      datePerdeuPlayboy.setUTCMinutes(1);

      clock = sinon.useFakeTimers(datePerdeuPlayboy);
      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      assert.isNull(confirmacao);
      clock.restore();
    });
    it('Confirma presença', async () => {
      let clock = sinon.useFakeTimers(new Date('10-29-2018'));
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);
      clock.restore();

      clock = sinon.useFakeTimers(new Date('10-28-2018'));
      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      assert.isNotNull(confirmacao);
      clock.restore();
    });
    it('Confirma presença (celula reservada)', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      await models.celula.create({ id: 1, periodo: 2, cpf_feirante: feirante.cpf });

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      assert.isNotNull(confirmacao);
    });
  });

  describe('cancelaPresencaFeiraAtual', () => {
    it('Retorna null se não existe feira atual', async () => {
      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNull(confirmacao);
    });
    it('Retorna null se feirante não existe', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual('33608124098', 1);
      assert.isNull(confirmacao);
    });
    it('Retorna null se feirante não foi confirmado', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const cancela = await participaController.cancelaPresencaFeiraAtual(feirante.cpf);
      assert.isNull(cancela);
    });

    it('Não cancela presença depois da data limite', async () => {
      let clock = sinon.useFakeTimers(new Date('10-28-2018'));
      const feira = await feiraController.addFeira(proximaSexta());
      assert.isNotNull(feira);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(confirmacao);
      clock.restore();

      const data = new Date('11-02-2018');
      data.setUTCHours(18);
      data.setUTCMinutes(1);
      clock = sinon.useFakeTimers(data);
      const cancela = await participaController.cancelaPresencaFeiraAtual(feirante.cpf);
      assert.isNull(cancela);
      clock.restore();
    });

    it('Cancela presença', async () => {
      let clock = sinon.useFakeTimers(new Date('10-28-2018'));
      const feira = await feiraController.addFeira(proximaSexta());
      assert.isNotNull(feira);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 1);
      assert.isNotNull(confirmacao);
      clock.restore();

      const data = new Date('11-02-2018');
      data.setUTCHours(17);
      data.setUTCMinutes(59);
      clock = sinon.useFakeTimers(data);
      const cancela = await participaController.cancelaPresencaFeiraAtual(feirante.cpf);
      assert.isNotNull(cancela);
      clock.restore();
    });
  });

  describe('getDadosCelulaFeiraAtual', () => {
    it('Retorna null se não existe feira atual', async () => {
      const celula = await models.celula.create({ id: 1, periodo: 2, cpf_feirante: feirante.cpf });
      const dadosCelula = await participaController.getDadosCelulaFeiraAtual(celula.id);
      assert.isNull(dadosCelula);
    });

    it('Retorna null se não existe celula', async () => {
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);
      const dadosCelula = await participaController.getDadosCelulaFeiraAtual(1);
      assert.isNull(dadosCelula);
    });

    it('Retorna cpfFeirante === null se celula não foi alocada', async () => {
      const celula = await models.celula.create({ id: 1, periodo: 2, cpf_feirante: feirante.cpf });
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);
      const dadosCelula = await participaController.getDadosCelulaFeiraAtual(celula.id);
      assert.isNotNull(dadosCelula);
      assert.isNull(dadosCelula.cpfFeirante);
    });

    it('Retorna cpfFeirante !== null se celula foi alocada', async () => {
      const celula = await models.celula.create({ id: 1, periodo: 2, cpf_feirante: feirante.cpf });
      const feira = await feiraController.addFeira(amanha());
      assert.isNotNull(feira);

      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      assert.isNotNull(confirmacao);

      const dadosCelula = await participaController.getDadosCelulaFeiraAtual(celula.id);
      assert.isNotNull(dadosCelula);
      assert.isNotNull(dadosCelula.cpfFeirante);
      assert.strictEqual(dadosCelula.cpfFeirante, feirante.cpf);
    });
  });

  describe('setPosicaoFeiranteFeiraAtual', () => {});

  describe('isFeiranteConfirmadoFeiraAtual', () => {
    it('Retorna true se feirante está confirmado na feira atual', async () => {
      await feiraController.addFeira(amanha());
      const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      assert.isNotNull(confirmacao);
      assert.isTrue(await participaController.isFeiranteConfirmadoFeiraAtual(feirante.cpf));
    });

    it('Retorna false se feirante não está confirmado na feira atual', async () => {
      await feiraController.addFeira(amanha());
      // const confirmacao = await participaController.confirmaPresencaFeiraAtual(feirante.cpf, 2);
      // assert.isNotNull(confirmacao);
      assert.isFalse(await participaController.isFeiranteConfirmadoFeiraAtual(feirante.cpf));
    });
  });
});
