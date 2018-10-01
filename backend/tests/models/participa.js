const chance = require('chance').Chance();
const { assert } = require('chai');

const models = require('../../models');

after(() => {
  models.sequelize.close();
});

describe('Testando participa', () => {
  before(() => {
    models.feirante.destroy({ where: {} });
    models.categoria.destroy({ where: {} });
    models.subcategoria.destroy({ where: {} });
    models.feira.destroy({ where: {} });
    models.celula.destroy({ where: {} });
    models.participa.destroy({ where: {} });
  });

  it.only('Adiciona feirante na feira', async () => {
    const feira = await models.feira.create({ data: '2018-09-28' });
    const categoria = await models.categoria.create({
      id: 1,
      nome: 'Categoria 1',
      need_cnpj: false,
    });

    const subCategoria = await categoria.createSubCategoria({ nome: 'SubCategoria 1' });

    const feirante = await models.feirante.create({
      cpf: '1',
      usa_ee: false,
      nome_ficticio: chance.name(),
      razao_social: chance.name(),
      comprimento_barraca: 4,
      largura_barraca: 4,
      endereco: chance.address(),
      sub_categoria_id: subCategoria.id,
    });

    assert.lengthOf(await feira.getFeirantes(), 0);
    await feira.addFeirante(feirante);
    assert.lengthOf(await feira.getFeirantes(), 1);
  });

  it('Não deixa adicionar feirante repetido na feira', async () => {
    await models.feirante
      .create({
        cpf: '1',
        usa_ee: false,
        nome_ficticio: chance.name(),
        razao_social: chance.name(),
        comprimento_barraca: 4,
        largura_barraca: 4,
        endereco: chance.address(),
        sub_categoria_id: 0,
      })
      .catch(async (err) => {
        const feira = await models.feira.findOne({ where: { data: '2018-09-28' } });
        const feirantes = await feira.getFeirantes();
        assert.lengthOf(feirantes, 1);
      });
  });

  it('Atualiza o faturamento', async () => {
    const feirante = await models.feirante.findOne({ where: { cpf: '1' } });
    assert.isNotNull(feirante);

    let participacoes = await feirante.getFeiras();

    assert.lengthOf(participacoes, 1);

    assert.strictEqual(participacoes[0].participa.faturamento, 0);

    await participacoes[0].participa.update({ faturamento: 5000 });

    participacoes = await feirante.getFeiras();
    assert.strictEqual(participacoes[0].participa.faturamento, 5000);
  });

  it('Define uma celula para um feirante na feira', async () => {
    const celula = await models.celula.create({ id: 1, periodo: 1 });
    let participa = await models.participa.findOne({
      where: { cpf_feirante: '1', data_feira: '2018-09-28' },
    });
    assert.isNotNull(participa);
    assert.isUndefined(participa.celula);

    await participa.setCelula(celula);
    participa = await models.participa.findOne({
      where: { cpf_feirante: '1', data_feira: '2018-09-28' },
    });
    assert.isNotNull(participa);
    assert.strictEqual(participa.celula_id, 1);
  });
});
