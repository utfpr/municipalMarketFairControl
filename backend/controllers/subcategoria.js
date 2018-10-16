const models = require('../models');

const addSubcategoria = async (nome, categoria_id) => {
  // O banco de dados não pode fazer essas verificações para mim?

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
    return await models.subcategoria.create({
      nome: nome,
      categoria_id: categoria_id,
    });
  } catch (error) {
    return null;
  }
};

const listSubcategorias = async () => {
  // Retorna todas as subcategorias, de todas as categorias
  // Se não houver nenhuma, retorna um array vazio
  const subcategorias = await models.subcategoria.findAll({
    where : {}
  });

  return subcategorias.map(el => ({
    id: el.id,
    nome: el.nome,
    categoria_id: el.categoria_id
  }));
};

const listSubcategoriasByCategoria = async (nome_categoria) => {
  // Retorna todas as subcategorias de uma categoria
  // Se não existir a categoria ou nao existir subcategorias dessa categoria,
  // retorna um array vazio

  // Buscando a categoria
  const categoria = await models.categoria.findOne({
    where: {nome: nome_categoria}
  });
  if (categoria === NULL)
    return {};

  // Buscando as subcategorias da categoria
  const subcategorias = await models.subcategoria.findAll({
    where: {categoria_id: categoria.id}
  });

  return subcategorias.map(el => ({
    id: el.id,
    nome: el.nome,
    categoria_id: el.categoria_id,
  }));
}

const getSubcategoria = async (id) => {
  // Por que eu buscaria uma subcategoria em específico?

  return await models.subcategoria.findOne({
    where: { id: id },
  })

  /*
  const subcategoria = await models.subcategoria.findOne({
    where: { nome: nome },
  });

  if (subcategoria === null)
    return null;

  return {
    id: subcategoria.id,
    nome: subcategoria.nome,
    categoria_id: subcategoria.categoria_id
  };
  */
}

const setSubcategoria = async (id, novo_nome) => {
  const subcategoria = getSubcategoria(id);
  
  if(subcategoria === null)
    return null;
  
  // Por que usar try?
  try {
    const res = await subcategoria.update({
      nome: novo_nome
    });
    return res;
  } catch (error) {
    return null;
  }
}

const deleteSubcategoria = async (id) => {
  // Verificando se existe uma subcategoria com esse id
  const subcategoria = await models.subcategoria.findOne({
    where: { id: id }
  });

  // Retorna false caso nao consiga?
  if (subcategoria === null)
    return false;

  // Removendo subcategoria
  await models.subcategoria.destroy({
    where: {id : subcategoria.id}
  });

  return true;
};

module.exports = {
  addSubcategoria,
  listSubcategorias,
  listSubcategoriasByCategoria,
  getSubcategoria,
  setSubcategoria,
  deleteSubcategoria,
}