const models = require('../models');

const findCelulaById = async (id) => {
  const celula = await models.celula.findOne({
    where: { id },
  });

  if (celula === null) return null;

  return {
    id: celula.id,
    cpf_feirante: celula.cpf_feirante,
    periodo: celula.periodo,
    x: celula.x,
    y: celula.y,
    comprimento: celula.comprimento,
    largura: celula.largura,
  };
};

// Retorna celula reservada para um feirante
const findCelulaByFeirante = async (cpfFeirante) => {
  const celula = await models.celula.findOne({
    where: { cpf_feirante: cpfFeirante },
  });
  if (celula === null) return null;

  return {
    id: celula.id,
    cpf_feirante: celula.cpf_feirante,
    periodo: celula.periodo,
    x: celula.x,
    y: celula.y,
    comprimento: celula.comprimento,
    largura: celula.largura,
  };
};

const listCelula = async () => {
  const celulas = await models.celula.findAll();
  return celulas.map(celula => ({
    id: celula.id,
    cpf_feirante: celula.cpf_feirante,
    periodo: celula.periodo,
    x: celula.x,
    y: celula.y,
    comprimento: celula.comprimento,
    largura: celula.largura,
  }));
};

const updateCelula = async (id, dados) => {
  const celula = await models.celula.findOne({ where: { id } });
  if (celula === null) return null;

  const { periodo } = dados;

  if (periodo !== undefined && (periodo < 1 || periodo > 3)) return null;

  try {
    return await celula.update(dados);
  } catch (error) {
    return null;
  }
};

module.exports = {
  findCelulaById,
  findCelulaByFeirante,
  listCelula,
  updateCelula,
};
