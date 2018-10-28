const models = require('../models');

const addCategoria = async (nome, needCnpj) => {
  const categoria = await models.categoria.findOne({
    where: { nome },
  });
  if (categoria != null) {
    return null;
  }
  try {
    const res = await models.categoria.create({
      nome,
      need_cnpj: needCnpj,
    });
    return res;
  } catch (error) {
    return null;
  }
};

const listCategoria = async () => {
  const categorias = await models.categoria.findAll();
  return categorias.map(el => ({
    id: el.id,
    nome: el.nome,
    need_cnpj: el.need_cnpj,
  }));
};

const findCategoriaById = async (id) => {
  const categoria = await models.categoria.findOne({
    where: { id },
  });
  if (categoria == null) {
    return null;
  }
  return { id: categoria.id, nome: categoria.nome, need_cnpj: categoria.need_cnpj };
};

const deleteCategoria = async (id) => {
  await models.categoria.destroy({
    where: { id },
  });
};

const updateCategoria = async (id, dados) => {
  const categoria = await models.categoria.findOne({
    where: { id },
  });
  if (categoria == null) {
    return null;
  }
  const res = await categoria.update(dados);
  return res;
};

module.exports = {
  addCategoria,
  listCategoria,
  findCategoriaById,
  deleteCategoria,
  updateCategoria,
};
