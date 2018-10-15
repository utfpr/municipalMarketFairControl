const models = require('../models');

const addSubcategoria = async (nome, categoria_id) => {
  // Verificando se existe alguma categoria com esse id
  const categoria = await models.categoria.findOne({
    where: {
      id: categoria_id,
    }
  });

  if (categoria === null)
    return null;
  
  // Verificando se existe alguma subcategoria com essas caracteristicas
  const subcategoria = await models.subcategoria.findOne({
    where: {
      categoria_id: categoria_id,
      nome: nome,
    }
  });

  if (subcategoria !== null)
    return null;

  // Adicionando subcategoria
  try {
    await models.subcategoria.create({
      nome: nome,
      categoria_id: categoria_id,
    });
  } catch (error) {
    return null;
  }
};

const listSubcategoria = async () => {
  const subcategorias = await models.supervisor.findAll({
    where : {}
  });

  return subcategorias.map(el => ({
    nome: el.nome,
    categoria_id: el.categoria_id
  }));
};

const findSubcategoriaByNome = async (nome) => {
  const subcategoria = await models.subcategoria.findOne({
    where: {
      nome: nome
    }
  });

  if (subcategoria === null)
  return null;

  return {
    id: subcategoria.id,
    nome: subcategoria.nome,
    categoria_id: subcategoria.categoria_id
  };
}

const deleteSubcategoria = async (nome) => {
  // Verificando se existe uma subcategoria com esse nome
  const subcategoria = await models.subcategoria.findOne({
    where: {
      nome: nome
    }
  });

  if (subcategoria === null)
    return null;

  // Removendo subcategoria
  await models.subcategoria.destroy({
    where: {nome : subcategoria.nome}
  });
};

module.exports = {
  addSubcategoria,
  listSubcategoria,
  findSubcategoriaByNome,
  deleteSubcategoria,
}