const models = require('../models');
const feiranteController = require('../controllers/feirante');

const findCelulaById = async (id) => {
  const celula = await models.celula.findOne({
    where: { id },
  });

  if (celula === null) return null;

  return {
    id: celula.id,
    cpf_feirante: celula.cpf_feirante,
    periodo: celula.periodo,
  };
};

const listCelula = async () => {
  const celulas = await models.celula.findAll();
  return celulas.map(el => ({
    id: el.id,
    cpf_feirante: el.cpf_feirante,
    periodo: el.periodo,
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
  listCelula,
  updateCelula,
};
