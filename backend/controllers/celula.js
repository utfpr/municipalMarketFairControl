const models = require('../models');

const listCelulas = async () => {
  const celulas = await models.celula.findAll();
  return celulas.map(el => ({
    id: el.id,
    cpf_feirante: el.cpf_feirante,
    periodo: el.periodo,
  }));
};

const getFeirante = async (id) => {
  const celula = await models.celula.findOne({ where: { id } });
  if (celula === null) return null;
  return celula.cpf_feirante;
};

const setFeirante = async (id, cpfFeirante) => {
  const celula = await models.celula.findOne({ where: { id } });
  if (celula === null) return null;

  //   const feirante = await models.feirante.findOne({ where: { cpf: cpfFeirante, status: true } });
  //   if (feirante === null) return null;

  try {
    const res = await celula.update({ cpf_feirante: cpfFeirante });
    return res;
  } catch (error) {
    return null;
  }
};

module.exports = { listCelulas, getFeirante, setFeirante };
