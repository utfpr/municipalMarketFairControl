const models = require('../models');

const addCategoria = async(nome, need_cnpj) => {
    const categoria = await models.categoria.findOne({
        where:{ nome }
    });
    if(categoria == null) return null;
    try {
        await models.categoria.create({
            nome, need_cnpj
        });
    } catch(error){
        return null
    }
};

const listCategorias = async() =>{
    const categorias = await models.categoria.findAll();
    return categorias.map(el => ({
        id: el.id,
        nome: el.nome,
        need_cnpj: el.need_cnpj
    }))
}

const findByNome = async(nome) =>{
    const categoria = await models.categoria.findOne({
        where: { nome }
    });
    if(categoria == null) return null;
    return {id: categoria.id, nome: categoria.nome, need_cnpj: categoria.need_cnpj}
}

const findById = async(id) =>{
    const categoria = await models.categoria.findOne({
        where: { id }
    });
    if(categoria == null) return null;
    return {id: categoria.id, nome: categoria.nome, need_cnpj: categoria.need_cnpj}
}

const removeCategoria = async(id) =>{
    const categoria = await models.categoria.findOne({
        where: { id }
    });
    if (categoria = null) return null;
    models.categoria.destroy({
        where:{ id }
    })
}

module.exports = {
    addCategoria,
    listCategorias,
    findById,
    findByNome,
    removeCategoria
}