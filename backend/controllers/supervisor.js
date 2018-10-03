const bcrypt = require('bcrypt');
const models = require('../models');
const secrets = require('../config/secrets.json');

// Cadastra supervisor
const addSupervisor = async (cpf, nome, senha, isAdm) => {
  const hashSenha = await bcrypt.hash(senha, secrets.bcrypt);

  // Verifica se o supervisor já existe (e está ativo)
  const supervisor = await models.supervisor.findOne({
    where: { cpf, status: true },
  });

  // Se não encontrar, retorna false
  if (supervisor !== null) return false;

  // Tenta criar
  try {
    await models.supervisor.create({
      cpf,
      nome,
      senha: hashSenha, // Salva o hash da senha no banco
      is_adm: isAdm,
      status: 1, // Isso é opcional, pois no banco está como DEFAULT true
    });
    return true;
  } catch (error) {
    // Se der erro, retorna false
    return false;
  }
};

// Lista todos os supervisores (apenas os que estão ativos)
const listSupervisor = async () => {
  const supervisores = await models.supervisor.findAll({
    where: {
      status: true,
    },
  });

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  return supervisores.map(el => ({
    cpf: el.cpf,
    nome: el.nome,
    is_adm: el.is_adm,
  }));
};

// Encontra supervisor pelo cpf
const findSupervisorByCpf = async (cpf) => {
  const supervisor = await models.supervisor.findOne({
    where: {
      cpf,
      status: true,
    },
  });

  if (supervisor === null) return false;

  // Retorna somente os dados necessários (não retornar status, senha, ...)
  return {
    cpf: supervisor.cpf,
    nome: supervisor.nome,
    is_adm: supervisor.is_adm,
  };
};

const updateSupervisor = async (cpf, dados) => {
  const supervisor = await models.supervisor.findOne({
    where: { cpf, status: true },
  });

  if (supervisor === null) return false;

  // https://stackoverflow.com/questions/34698905/clone-a-js-object-except-for-one-key
  // Não deixa atualizar o status
  const { status, ...obj } = dados;

  // Se for atualizar a senha, computar o hash
  if ('senha' in obj) {
    obj.senha = await bcrypt.hash(obj.senha, secrets.bcrypt);
  }
  try {
    await supervisor.update(obj);
    return true;
  } catch (error) {
    return false;
  }
};

// "Apaga o supervisor" (troca status para 0)
const deleteSupervisor = async (cpf) => {
  const supervisor = await models.supervisor.findOne({
    where: { cpf, status: true },
  });
  if (supervisor === null) return false;

  await supervisor.update({ status: false });
  return true;
};

module.exports = {
  addSupervisor,
  listSupervisor,
  findSupervisorByCpf,
  updateSupervisor,
  deleteSupervisor,
};
