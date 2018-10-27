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

const updateCelula = async (id, cpfFeirante, periodo) => {
  const celula = await models.celula.findOne({ where: { id } });
  if (celula === null) return null;

  const feirante = await models.feirante.findOne({
    where: { cpf: cpfFeirante, status: true },
  });
  if (feirante === null) return null;

  if (periodo === 1 || periodo === 2 || periodo === 3) {
    try {
      return await celula.update({ cpf_feirante: cpfFeirante, periodo });
    } catch (error) {
      return null;
    }
  }

  return null;
};

module.exports = {
  findCelulaById,
  listCelula,
  updateCelula,
};
