const models = require('../models');


const findSubcategoriaById = async (subcategoriaId) => {
  return models.subcategoria.findOne({
    where: { id: subcategoriaId },
  });
};

const addSubcategoria = async (nome, categoriaId) => {
  try {
    return models.subcategoria.create({
      nome,
      categoria_id: categoriaId,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateSubcategoria = async (subcategoriaId, novoNome) => {
  try {
    return await models.subcategoria.update(
      { nome: novoNome },
      { where: { id: subcategoriaId } },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteSubcategoria = async (subcategoriaId) => {
  try {
    return await models.subcategoria.destroy({ where: { id: subcategoriaId } });
  } catch (error) {
    console.log(error);
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
};
