const models = require('../models');
//const controllerCategoria = require('categoria');
//OKAY
const exist = (obj) => {
  return obj !== null;
}
// OKAY
const notExist = (obj) => {
  return obj === null;
}
// OKAY
const getCategoriaByNome = async (nome) => {
  return models.categoria.findOne({
    where: { nome: nome }
  });
}
// OKAY
const getCategoriaById = async (id) => {
  return models.categoria.findOne({
    where: { id: id }
  });
}


/* ******************************************************************** */
/*             Funções acima não devem estar neste arquivo              */
/* ******************************************************************** */

// OKAY
const getSubcategoria = async (nome, categoria_id) => {
  return models.subcategoria.findOne({
    where: { nome: nome, categoria_id: categoria_id }
  });
}

const findSubcategoriaById = async (id) => {
  return models.subcategoria.findOne({
    where: { id: id }
  });
}

const setSubcategoria = async (nome, categoria_id, novo_nome) => {
  // Verificando se existe a categoria
  const categoria = await getCategoriaById(categoria_id);

  // Se a categoria não existir, não é possível fazer a atualização
  if (notExist(categoria))
    return null;

  // Verificando se já existe essa subcategoria
  const subcategoria = await getSubcategoria(nome, categoria.id);

  // Se a subcategoria não existir, não é possível fazer a atualização
  if (notExist(subcategoria))
    return null;

  // Caso contrario, atualiza
  models.subcategoria.update(
    { nome: novo_nome},
    { where: {nome: nome, categoria_id: categoria.id} }
  );
}
// OKAY
const addSubcategoria = async (nome, categoria_id) => {
  // Verificando se existe a categoria
  const categoria = await getCategoriaById(categoria_id);

  // Se a categoria não existir, não é possível adicionar
  if (notExist(categoria))
    return null;

  // Verificando se já existe essa subcategoria
  const subcategoria = await getSubcategoria(nome, categoria.id);

  // Se já existe, não é preciso adicionar
  if (exist(subcategoria))
    return null;

  // Caso contrario, adiciona
  try {
    // Tentando adicionar e retornar uma subcategoria nova
    return models.subcategoria.create({
      nome: nome,
      categoria_id: categoria.id,
    });
  } catch (error) {
    // Se acontecer algum erro retorna null
    return null;
  }
};

const deleteSubcategoria = (nome, categoria_id) => {
  // Verificando se existe a categoria
  const categoria = getCategoriaById(categoria_id);

  // Se a categoria não existir, não é possível fazer a atualização
  if (notExist(categoria))
    return null;

  // Verificando se já existe essa subcategoria
  const subcategoria = getSubcategoria(nome, categoria.id);

  // Se a subcategoria não existir, não é possível fazer a atualização
  if (notExist(subcategoria))
    return null;

  // Caso contrário, deleta
  try {
    // Removendo subcategoria
    subcategoria.destroy();
  } catch (error) {
    return null;
  }
};
// OKAY
const listSubcategorias = async () => {
  // Retorna todas as subcategorias, de todas as categorias
  // Se não houver nenhuma, retorna um array vazio
  return models.subcategoria.findAll({
    where: {}
  });
};
// OKAY
const listSubcategoriasByCategoria = async (categoria_id) => {
  // Verificando se a categoria existe
  const categoria = await getCategoriaById(categoria_id);

  // Se a categoria não existir, não é possível listar as suas subcategorias
  if (notExist(categoria))
    return null;

  // Caso contrário, retorna uma lista das subcategorias da categoria
  return await models.subcategoria.findAll({
    where: { categoria_id: categoria.id }
  });
}

module.exports = {
  getSubcategoria, setSubcategoria,

  findSubcategoriaById,

  addSubcategoria, deleteSubcategoria,

  listSubcategorias, listSubcategoriasByCategoria,
}