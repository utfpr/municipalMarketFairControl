const Sequelize = require('sequelize');
const models = require('../models/');
const { proximaSexta } = require('./utils');

const op = Sequelize.Op;

const listFeiras = async () => {
  const feiras = await models.feira.findAll({ order: [['data', 'DESC']] });

  return feiras;
};

const findFeira = async (dataFeira) => {
  const feira = await models.feira.findOne({
    where: { data: dataFeira },
  });

  if (!feira) return null;

  return feira;
};

const findFeiraAtual = async () => {
  const dataAtual = new Date();
  const nextData = new Date();
  dataAtual.setDate(dataAtual.getDate() - 1);
  nextData.setDate(nextData.getDate() + 7);

  // let hoje = dataAtual.getFullYear().toString();
  // hoje = hoje.concat('-', dataAtual.getMonth().toString(), '-', dataAtual.getDate().toString());
  // let prox = nextData.getFullYear().toString();
  // prox = prox.concat('-', nextData.getMonth().toString(), '-', nextData.getDate().toString());

  const hoje = dataAtual.toISOString().split('T')[0];
  const prox = nextData.toISOString().split('T')[0];

  const feira = await models.feira.findOne({
    // encontra a feira da semana
    where: {
      data: {
        [op.between]: [hoje, prox],
      },
      status: true,
    },
  });

  return feira;
};

// Realmente necessário?
const feiraAtualInfo = async () => {
  const feira = await findFeiraAtual();

  if (feira !== null) {
    return {
      data: feira.data,
      data_limite: feira.data_limite,
      status: feira.status,
      evento_image_url: feira.evento_image_url,
    };
  }

  return null;
  // devolve a {data, status} da feira casa haja
  // senao retorna null
};

const setDataLimiteFeiraAtual = async (dataHora) => {
  const feira = await findFeiraAtual();
  if (feira === null) return null;

  const agora = new Date();
  if (dataHora < agora) return null;

  try {
    return await feira.update({ data_limite: dataHora });
  } catch (error) {
    return null;
  }
};

const addFeira = async (dataFeira, eventoImageUrl) => {
  //  const data = date.slice(6, 10).concat('-', date.slice(3, 5), '-', date.slice(0, 2));

  // const feira = await models.feira.findOne({
  //   where: {
  //     data,
  //   },
  // });
  // console.log('aaaa')
  // if (feira != null) {
  //   return null;
  // }

  const agora = new Date();
  if (dataFeira < agora) return null;

  try {
    return await models.feira.create({
      data: dataFeira.toISOString().split('T')[0],
      data_limite: proximaSexta(),
      evento_image_url: eventoImageUrl,
      status: true,
    });
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
  // adiciona uma feira no banco
  // se der certo retorna true
  // caso algum erro ocorra devolve null
};

const alteraFeiraStatus = async (data) => {
  const feira = await findFeira(data);

  if (feira) {
    return feira.update({ status: !feira.status });
  }

  return null;
  // altera o status de uma feira
  // retorna null se der errado
};

const alteraFotoFeira = async (data, photo) => {
  const feira = await findFeira(data);

  if (feira) {
    return feira.update({ evento_image_url: photo });
  }

  return null;
};

const cancelaFeiraAtual = async () => {
  const feira = await findFeiraAtual();

  if (feira !== null) {
    const disable = await feira.update({ status: false });
    return disable;
  }

  return null;
  // cancelar a fiera atual
  // desativa
  // retorna null se der errado
};

module.exports = {
  findFeira,
  findFeiraAtual,
  feiraAtualInfo,
  setDataLimiteFeiraAtual,
  addFeira,
  alteraFeiraStatus,
  alteraFotoFeira,
  cancelaFeiraAtual,
  listFeiras,
};
