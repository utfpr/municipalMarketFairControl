const bcrypt = require('bcrypt');
const models = require('../models');

const addSupervisor = async (cpf, nome, senha, isAdm) => {
  const supervisor = await models.supervisor.findOne({
    where: { cpf },
  });

  const hashSenha = await bcrypt.hash(senha, 10);

  if (supervisor !== null && !supervisor.status) {
    const ret = await supervisor.update({
      cpf,
      nome,
      senha: hashSenha,
      is_amd: isAdm,
      status: true,
    });
    return ret;
  }

  if (supervisor === null) {
    try {
      const ret = await models.supervisor.create({
        cpf,
        nome,
        senha: hashSenha,
        is_adm: isAdm,
        status: true,
      });
      return ret;
    } catch (error) {
      return null;
    }
  }
  return null;
};

const listSupervisor = async () => {
  const supervisores = await models.supervisor.findAll({
    where: {
      status: true,
    },
  });

  return supervisores.map(el => ({
    cpf: el.cpf,
    nome: el.nome,
    is_adm: el.is_adm,
  }));
};

const findSupervisorByCpf = async (cpf) => {
  const supervisor = await models.supervisor.findOne({
    where: {
      cpf,
      status: true,
    },
  });

  if (supervisor === null) return null;

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

  if (supervisor === null) return null;

  if ('status' in dados) return null;

  const { ...obj } = dados;

  if ('senha' in obj) {
    obj.senha = await bcrypt.hash(obj.senha, 10);
  }
  try {
    return await supervisor.update(obj);
  } catch (error) {
    return null;
  }
};

const deleteSupervisor = async (cpf) => {
  const supervisor = await models.supervisor.findOne({
    where: { cpf, status: true },
  });
  if (supervisor === null) return null;

  const ret = await supervisor.update({ status: false });
  return ret;
};

module.exports = {
  addSupervisor,
  listSupervisor,
  findSupervisorByCpf,
  updateSupervisor,
  deleteSupervisor,
};
