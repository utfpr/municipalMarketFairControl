const models = require('../models');

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
    return await models.aviso.remove({
      where: {
        id,
      },
    });
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
    return aviso.update({
      id,
      assunto,
      texto,
    });
  }

  return null;
};

const getAvisos = () => {
  models.aviso.findAll();
};

module.exports = {
  addAviso,
  removeAviso,
  updateAviso,
  getAvisos,
};
