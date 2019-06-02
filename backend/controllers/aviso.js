const models = require('../models');
const feiraController = require('../controllers/feira');

const addAviso = async (assunto, texto) => {
  try {
    return await models.aviso.create({
      assunto,
      texto,
    });
  } catch (error) {
    return null;
  }
};

const removeAviso = async (id) => {
  try {
    return await models.aviso.destroy({ where: { id } });
  } catch (error) {
    return null;
  }
};

const updateAviso = async (id, assunto, texto) => {
  const aviso = await models.aviso.findOne({
    where: {
      id,
    },
  });
  if (aviso !== null) {
    try {
      return await aviso.update({
        assunto,
        texto,
      });
    } catch (error) {
      return null;
    }
  }

  return null;
};

const getAvisos = async () => {
  const feiraAtual = await feiraController.findFeiraAtual();
  const avisos = await models.aviso.findAll({
    where: {
      data_feira: feiraAtual.data,
    },
  });
  return avisos || [];
};

const getById = async (id) => {
  try {
    const one = await models.aviso.findOne({
      where: {
        id,
      },
    });
    return {
      id,
      assunto: one.assunto,
      texto: one.texto,
    };
  } catch (error) {
    return null;
  }
};

module.exports = {
  addAviso,
  removeAviso,
  updateAviso,
  getAvisos,
  getById,
};
