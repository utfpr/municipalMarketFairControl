const models = require('../models');
const feiraController = require('../controllers/feira');

const addAviso = async (assunto, texto, data_feira) => {
  try {
    const feira = await feiraController.findFeira(data_feira);
    if (!feira) return {};
    return models.aviso.create({
      assunto,
      texto,
      data_feira,
    });
  } catch (error) {
    return null;
  }
};

const removeAviso = async (id) => {
  try {
    return models.aviso.destroy({ where: { id } });
  } catch (error) {
    return null;
  }
};

const updateAviso = async (id, assunto, texto, data_feira) => {
  const feira = await feiraController.findFeira(data_feira);
  const aviso = await models.aviso.findOne({
    where: {
      id,
    },
  });

  if (!feira || !aviso) return null;

  try {
    return await aviso.update({
      assunto,
      texto,
      data_feira,
    });
  } catch (error) {
    return null;
  }
};

const getAvisos = async () => {
  const avisos = await models.aviso.findAll({
    where: {},
  });
  return avisos || [];
};

const getAvisosProximaFeira = async () => {
  const feiraAtual = await feiraController.findFeiraAtual();
  if (!feiraAtual) return [];
  const avisos = await models.aviso.findAll({
    where: {
      data_feira: feiraAtual.data,
    },
  });
  return avisos || [];
};

const getById = async (id) => {
  try {
    const aviso = await models.aviso.findOne({
      where: {
        id,
      },
    });
    return aviso;
  } catch (error) {
    return null;
  }
};

module.exports = {
  addAviso,
  removeAviso,
  updateAviso,
  getAvisosProximaFeira,
  getAvisos,
  getById,
};
