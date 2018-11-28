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

const getAvisos = () => models.aviso.findAll();

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
    }
  } catch (error) {
    return null;
  }
}

module.exports = {
  addAviso,
  removeAviso,
  updateAviso,
  getAvisos,
  getById,
};
