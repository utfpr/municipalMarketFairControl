const models = require('../models');


const findSubcategoriaById = async (subcategoria_id) => {
  return models.subcategoria.findOne({
    where: { id: subcategoria_id }
  });
}

const addSubcategoria = async (nome, categoria_id) => {
  try {
    return models.subcategoria.create({
      nome: nome,
      categoria_id: categoria_id,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

const updateSubcategoria = async (subcategoria_id, novo_nome) => {
  try {
    models.subcategoria.update(
      { nome: novo_nome },
      { where: { id: subcategoria_id } }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

const deleteSubcategoria = async (subcategoria_id) => {
  try {
    models.subcategoria.destroy({ where: { id: subcategoria_id } });
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  findSubcategoriaById,

  addSubcategoria,

  updateSubcategoria,

  deleteSubcategoria,
}