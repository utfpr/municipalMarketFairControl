const models = require('../models');

const findSubcategoriaById = async (subcategoriaId) => {
  const res = await models.subcategoria.findOne({
    where: { id: subcategoriaId },
  });
  return res;
};

const findCategoriaBySubcategoria = async (subcategoriaId) => {
  const sub = await models.subcategoria.findOne({
    where: { id: subcategoriaId },
  });

  const cat = await models.categoria.findOne({
    where: { id: sub.categoria_id },
  });

  return cat;
};

const addSubcategoria = async (nome, categoriaId) => {
  try {
    return models.subcategoria.create({
      nome,
      categoria_id: categoriaId,
    });
  } catch (error) {
    return null;
  }
};

const updateSubcategoria = async (id, nome) => {
  const subcategoria = await models.subcategoria.findOne({ where: { id } });
  if (subcategoria === null) return null;

  try {
    const res = await subcategoria.update({ nome });
    return res;
  } catch (error) {
    return null;
  }
};

const deleteSubcategoria = async (subcategoriaId) => {
  try {
    return await models.subcategoria.destroy({ where: { id: subcategoriaId } });
  } catch (error) {
    return null;
  }
};
const listSubcategoriasByCategoria = async (categoriaId) => {
  const subcategorias = await models.subcategoria.findAll({
    where: {
      categoria_id: categoriaId,
    },
  });

  if (subcategorias != null) {
    return subcategorias;
  }

  return null;
};

module.exports = {
  findSubcategoriaById,
  addSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
  listSubcategoriasByCategoria,
  findCategoriaBySubcategoria,
};
