const models = require('../models');

const addCategoria = async(nome, need_cnpj) => {
    const categoria = await models.categoria.findOne({
        where:{ nome }
    });
    if(categoria != null) {
        console.log("Categoria já cadastrada");
        return null;
    }
    try {
        let res = await models.categoria.create({
            nome, need_cnpj
        });
        return res;
    } catch(error){
        console.log(`Erro ao cadastrar`);
        return null
    }
};

const listCategorias = async() =>{
    const categorias = await models.categoria.findAll();
    return categorias.map(el => ({
        id: el.id,
        nome: el.nome,
        need_cnpj: el.need_cnpj
    }));
}


const findByid = async(id) =>{
    const categoria = await models.categoria.findOne({
        where: { id }
    });
    if(categoria == null){
        return null;
    }
    return {id: categoria.id, nome: categoria.nome, need_cnpj: categoria.need_cnpj}
}

const removeCategoria = async(id) =>{
    const categoria = await models.categoria.findOne({
        where: { id }
    });
    if (categoria == null) return null;
    models.categoria.destroy({
        where:{ id }
    });
}

const updateCategoria = async(id, dados) =>{
    const categoria = await models.categoria.findOne({
        where: { id }
    });
    if (categoria == null) {
        return null;
    }
    return await categoria.update(dados);
}

module.exports = {
    addCategoria,
    listCategorias,
    findByid,
    removeCategoria,
    updateCategoria
}