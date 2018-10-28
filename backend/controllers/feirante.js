const bcrypt = require('bcrypt');
const models = require('../models');

const addFeirante = async (
  cpf,
  rg,
  nome,
  cnpj,
  senha,
  usaEe,
  nomeFantasia,
  razaoSocial,
  comprimentoBarraca,
  larguraBarraca,
  endereco,
  voltagemEe,
  subCategoriaId,
) => {
  const feirante = await models.feirante.findOne({
    where: { cpf },
  });

  const hashSenha = await bcrypt.hash(senha, 10);

  if (feirante !== null && !feirante.status) {
    const ret = await feirante.update({
      cpf,
      rg,
      nome,
      cnpj,
      senha: hashSenha,
      usa_ee: usaEe,
      nome_fantasia: nomeFantasia,
      razao_social: razaoSocial,
      comprimento_barraca: comprimentoBarraca,
      largura_barraca: larguraBarraca,
      voltagem_ee: voltagemEe,
      sub_categoria_id: subCategoriaId,
      status: true,
    });
    return ret;
  }

  // Utilizando transaction pois se ocorrer erro
  // no momento de adicionar o endereço é necessário fazer rollback do feirante
  let transaction;
  if (feirante === null) {
    try {
      transaction = await models.sequelize.transaction();

      const ret = await models.feirante.create({
        cpf,
        rg,
        nome,
        cnpj,
        senha: hashSenha,
        usa_ee: usaEe,
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        comprimento_barraca: comprimentoBarraca,
        largura_barraca: larguraBarraca,
        voltagem_ee: voltagemEe,
        sub_categoria_id: subCategoriaId,
        status: true,
      });

      await models.endereco.create({
        cpf_feirante: cpf,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        numero: endereco.numero,
        CEP: endereco.CEP,
      });

      await transaction.commit();
      return ret;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  }
  return null;
};

const listFeirante = async () => {
  const feirantes = await models.feirante.findAll({
    where: {
      status: true,
    },

    include: ['endereco'],
  });

  return feirantes.map(el => ({
    cpf: el.cpf,
    rg: el.rg,
    nome: el.nome,
    cnpj: el.cnpj,
    usaEe: el.usa_ee,
    nomeFantasia: el.nome_fantasia,
    razaoSocial: el.razao_social,
    comprimentoBarraca: el.comprimento_barraca,
    larguraBarraca: el.largura_barraca,
    endereco: {
      logradouro: el.endereco.logradouro,
      bairro: el.endereco.bairro,
      numero: el.endereco.numero,
      CEP: el.endereco.CEP,
    },
    voltagemEe: el.voltagem_ee,
    subCategoriaId: el.sub_categoria_id,
  }));
};

const findFeiranteByCpf = async (cpf) => {
  const feirante = await models.feirante.findOne({
    where: {
      cpf,
      status: true,
    },
    include: ['endereco'],
  });

  if (feirante === null) return null;

  return {
    cpf: feirante.cpf,
    rg: feirante.rg,
    nome: feirante.nome,
    cnpj: feirante.cnpj,
    usaEe: feirante.usa_ee,
    nomeFantasia: feirante.nome_fantasia,
    razaoSocial: feirante.razao_social,
    comprimentoBarraca: feirante.comprimento_barraca,
    larguraBarraca: feirante.largura_barraca,
    endereco: {
      logradouro: feirante.endereco.logradouro,
      bairro: feirante.endereco.bairro,
      numero: feirante.endereco.numero,
      CEP: feirante.endereco.CEP,
    },
    voltagemEe: feirante.voltagem_ee,
    subCategoriaId: feirante.sub_categoria_id,
  };
};

const updateFeirante = async (cpf, dados) => {
  const feirante = await models.feirante.findOne({
    where: { cpf, status: true },
  });

  if (feirante === null) return null;

  if ('status' in dados) return null;

  const { endereco, ...obj } = dados;

  if ('senha' in obj) {
    obj.senha = await bcrypt.hash(obj.senha, 10);
  }

  if (endereco !== undefined) {
    const enderecoTmp = await models.endereco.findOne({ where: { cpf_feirante: cpf } });
    try {
      await enderecoTmp.update(endereco);
      if (Object.keys(obj).length === 0) {
        const ret = await models.feirante.findOne({
          where: { cpf, status: true },
          include: ['endereco'],
        });
        return ret;
      }
    } catch (error) {
      return null;
    }
  }

  if (Object.keys(obj).length !== 0) {
    try {
      await feirante.update(obj);
      const ret = await models.feirante.findOne({
        where: { cpf, status: true },
        include: ['endereco'],
      });
      return ret;
    } catch (error) {
      return null;
    }
  }
};

const deleteFeirante = async (cpf) => {
  const feirante = await models.feirante.findOne({
    where: { cpf, status: true },
  });
  if (feirante === null) return null;

  const ret = await feirante.update({ status: false });
  return ret;
};

module.exports = {
  addFeirante,
  listFeirante,
  findFeiranteByCpf,
  updateFeirante,
  deleteFeirante,
};
