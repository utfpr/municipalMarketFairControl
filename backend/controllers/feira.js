const Sequelize = require('sequelize');
const models = require('../models/');

const op = Sequelize.Op;

const findFeira = async () => {
  const dataAtual = new Date();
  const nextData = new Date();
  dataAtual.setDate(dataAtual.getDate() - 1);
  nextData.setDate(nextData.getDate() + 7);

  let hoje = dataAtual.getFullYear().toString();
  hoje = hoje.concat('-', dataAtual.getMonth().toString(), '-', dataAtual.getDate().toString());
  let prox = nextData.getFullYear().toString();
  prox = prox.concat('-', nextData.getMonth().toString(), '-', nextData.getDate().toString());

  const feira = await models.feira.findOne({ // encontra a feira da semana
    where: {
      data: {
        [op.between]: [hoje, prox],
      },
    },
  });

  return feira;
};

const feiraInfo = async () => {
  const feira = await findFeira();

  if (feira != null) {
    return {
      data: feira.data,
      status: feira.status,
    };
  }

  return null;
  // devolve a {data, status} da feira casa haja
  // senao retorna null
};

const addFeira = async (date) => {
  const data = date.slice(6, 10).concat('-', date.slice(3, 5), '-', date.slice(0, 2));

  const feira = await models.feira.findOne({
    where: {
      data,
    },
  });
  if (feira != null) {
    return null;
  }

  const status = true;
  try {
    return await models.feira.create({
      data,
      status,
    });
  } catch (error) {
    return null;
  }
  // adiciona uma feira no banco
  // se der certo retorna true
  // caso algum erro ocorra devolve null
};

const calcelaFeira = async () => {
  const feira = await findFeira();

  if (feira != null) {
    const disable = await feira.update({ status: false });
    return disable;
  }

  return null;
  // cancelar a fiera atual
  // desativa
  // retorna null se der errado
};
module.exports = {
  feiraInfo,
  addFeira,
  calcelaFeira,
};
