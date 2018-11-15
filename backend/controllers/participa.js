const Sequelize = require('sequelize');
const models = require('../models/');
const feiraController = require('./feira');
const feiranteController = require('./feirante');
const celulaController = require('./celula');

// Feirantes confirmados em determinada feira
const listFeirantesConfirmados = async (dataFeira) => {
  const feira = await feiraController.findFeira(dataFeira);
  if (feira === null) return null;

  const confirmacoes = await feira.getFeirantes({
    order: [[Sequelize.literal('participa.hora_confirmacao'), 'ASC']],
  });

  return confirmacoes.map(confirmacao => ({
    feirante: {
      cpf: confirmacao.cpf,
      nome: confirmacao.nome,
      usaEe: confirmacao.usa_ee,
      nomeFantasia: confirmacao.nome_fantasia,
      comprimentoBarraca: confirmacao.comprimento_barraca,
      larguraBarraca: confirmacao.largura_barraca,
      voltagemEe: confirmacao.voltagem_ee,
      subCategoriaId: confirmacao.sub_categoria_id,
    },

    periodo: confirmacao.participa.periodo,
    horaConfirmacao: confirmacao.participa.hora_confirmacao,
    celulaId: confirmacao.participa.celula_id,
  }));
};

// Feirantes confirmados feira atual
const listFeirantesConfirmadosFeiraAtual = async () => {
  const feiraAtual = await feiraController.findFeiraAtual();
  if (feiraAtual === null) return null;

  const ret = await listFeirantesConfirmados(new Date(feiraAtual.data));
  return ret;
};

const isFeiranteConfirmadoFeiraAtual = async (cpfFeirante) => {
  const feiraAtual = await feiraController.findFeiraAtual();
  if (feiraAtual === null) return null;

  const participacao = await models.participa.findOne({
    where: {
      cpf_feirante: cpfFeirante,
      data_feira: feiraAtual.data,
    },
  });
  if (participacao === null) return false;
  return true;
};

const confirmaPresencaFeiraAtual = async (cpfFeirante, periodo) => {
  if (periodo < 1 || periodo > 3) return null;

  const feira = await feiraController.findFeiraAtual();
  if (feira === null) return null;

  const dataLimite = feira.data_limite;
  const agora = new Date();

  if (agora > dataLimite) return null;

  const feirante = await feiranteController.findFeiranteByCpf(cpfFeirante);
  if (feirante === null) return null;

  const celulaFeirante = await celulaController.findCelulaByFeirante(cpfFeirante);
  if (celulaFeirante !== null && celulaFeirante.periodo !== periodo) return null;

  try {
    const participa = await models.participa.create({
      cpf_feirante: cpfFeirante,
      data_feira: feira.data,
      periodo,
      celula_id: celulaFeirante !== null ? celulaFeirante.id : null,
      hora_confirmacao: new Date().toISOString(),
    });
    return participa;
  } catch (error) {
    return null;
  }
};

const cancelaPresencaFeiraAtual = async (cpfFeirante) => {
  const feira = await feiraController.findFeiraAtual();
  if (feira === null) return null;

  const dataLimite = feira.data_limite;
  const agora = new Date();

  if (agora > dataLimite) return null;

  const feirante = await feiranteController.findFeiranteByCpf(cpfFeirante);
  if (feirante === null) return null;

  const participacao = await models.participa.findOne({
    where: {
      cpf_feirante: cpfFeirante,
      data_feira: feira.data,
    },
  });
  if (participacao === null) return null;

  try {
    return await models.participa.destroy({
      where: {
        cpf_feirante: cpfFeirante,
        data_feira: feira.data,
      },
    });
  } catch (error) {
    return null;
  }
};

const getDadosCelulaFeiraAtual = async (celulaId) => {
  const feira = await feiraController.findFeiraAtual();
  if (feira === null) return null;

  const celula = await celulaController.findCelulaById(celulaId);
  if (celula === null) return null;

  const celulaFeira = await models.participa.findOne({
    where: {
      data_feira: feira.data,
      celula_id: celulaId,
    },
  });

  if (celulaFeira === null) {
    return {
      cpfFeirante: null,
    };
  }

  return {
    cpfFeirante: celulaFeira.cpf_feirante,
  };
};

const setPosicaoFeiranteFeiraAtual = async (cpfFeirante, celulaId, force = false) => {
  const feira = await feiraController.findFeiraAtual();
  if (feira === null) return null;

  const feirante = await feiranteController.findFeiranteByCpf(cpfFeirante);
  if (feirante === null) return null;

  const confirmacao = await models.participa.findOne({
    where: {
      data_feira: feira.data,
      cpf_feirante: cpfFeirante,
    },
  });

  if (confirmacao === null) return null;

  if (celulaId !== null) {
    const celula = await celulaController.findCelulaById(celulaId);
    if (celula.periodo !== confirmacao.periodo) return null;
  }
 
  if (celulaId === null) {
    try {
     
      return await confirmacao.update({ celula_id: null });
    } catch (error) {
      return null;
    }
  }

  const dadosCelula = await getDadosCelulaFeiraAtual(celulaId);
  if (dadosCelula.cpfFeirante === null) {
    try {
      return await confirmacao.update({ celula_id: celulaId });
    } catch (error) {
      return null;
    }
  }

  if (force) {
    const confirmacaoCelulaOcupada = await models.sequelize.participa.findOne({
      where: { data_feira: feira.data, celula_id: celulaId },
    });
    try {
      await confirmacaoCelulaOcupada.update({ celula_id: null });
      return await confirmacao.update({ celula_id: celulaId });
    } catch (error) {
      return null;
    }
  }
  return null;
};

module.exports = {
  listFeirantesConfirmados,
  listFeirantesConfirmadosFeiraAtual,
  confirmaPresencaFeiraAtual,
  cancelaPresencaFeiraAtual,
  getDadosCelulaFeiraAtual,
  setPosicaoFeiranteFeiraAtual,
  isFeiranteConfirmadoFeiraAtual,
};
