const bcrypt = require("bcrypt");
const models = require("../models");

const addFeirante = async (
  cpf,
  rg,
  nome,
  cnpj,
  senha,
  usa_ee,
  nome_fantasia,
  razao_social,
  comprimento_barraca,
  largura_barraca,
  endereco,
  voltagem_ee,
  sub_categoria_id
) => {
  const hashSenha = await bcrypt.hash(senha, 10);

  const feirante = await models.feirante.findOne({
    where: { cpf, status: true }
  });

  if (feirante !== null) return null;

  const subcategoria = await models.subcategoria.findOne({
    where: { id: sub_categoria_id }
  });

  if (subcategoria === null) return null;

  try {
    await models.feirante.create({
      cpf,
      rg,
      nome,
      cnpj,
      senha: hashSenha,
      usa_ee,
      nome_fantasia,
      razao_social,
      comprimento_barraca,
      largura_barraca,
      voltagem_ee,
      sub_categoria_id
    });
    await models.endereco.create({
      logradouro: endereco.logradouro,
      bairro: endereco.bairro,
      numero: endereco.numero,
      CEP: endereco.cep
    });
  } catch (error) {
    return null;
  }
};

const listFeirantes = async () => {
  const feirantes = await models.feirante.findAll({
    where: {
      status: true
    }
  });

  return feirantes.map(el => ({
    cpf: el.cpf,
    rg: el.rg,
    nome: el.nome,
    cnpj: el.cnpj,
    usa_ee: el.usa_ee,
    nome_fantasia: el.nome_fantasia,
    razao_social: el.razao_social,
    comprimento_barraca: el.comprimento_barraca,
    largura_barraca: el.largura_barraca,
    endereco: el.endereco,
    voltagem_ee: el.voltagem_ee,
    sub_categoria_id: el.sub_categoria_id
  }));
};

const findFeiranteByCpf = async cpf => {
  const feirante = await models.feirante.findOne({
    where: {
      cpf,
      status: true
    }
  });
  const endereco = await models.endereco.findOne({
    where: {
      cpf_feirante: feirante.cpf
    }
  });

  if (feirante === null) return null;

  return {
    cpf: feirante.cpf,
    rg: feirante.rg,
    nome: feirante.nome,
    cnpj: feirante.cnpj,
    usa_ee: feirante.usa_ee,
    nome_fantasia: feirante.nome_fantasia,
    razao_social: feirante.razao_social,
    comprimento_barraca: feirante.comprimento_barraca,
    largura_barraca: feirante.largura_barraca,
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    numero: endereco.numero,
    cep: endereco.cep,
    voltagem_ee: feirante.voltagem_ee,
    sub_categoria_id: feirante.sub_categoria_id
  };
};

const updateFeirante = async (cpf, dados) => {
  const feirante = await models.feirante.findOne({
    where: { cpf, status: true }
  });

  if (feirante === null) return null;

  const { status, ...obj } = dados;

  if ("senha" in obj) {
    obj.senha = bcrypt.hash(obj.senha, 10);
  }
  try {
    await feirante.update(obj);
  } catch (error) {
    return null;
  }
};

const deleteFeirante = async cpf => {
  const feirante = await models.feirante.findOne({
    where: { cpf, status: true }
  });
  if (feirante === null) return null;

  await feirante.update({ status: false });
};

module.exports = {
  addFeirante,
  listFeirantes,
  findFeiranteByCpf,
  updateFeirante,
  deleteFeirante
};
