import axios from 'axios';

const feira = `${process.env.REACT_APP_HOST}/feira`;
const participa = `${process.env.REACT_APP_HOST}/participa`;

export async function getFeiras() {
  const feiras = (await axios.get(
    feira,
    { headers: { token: localStorage.getItem('token') } },
  )).data;

  return feiras;
}

export async function getFaturamentoPeriodo(data) {
  const faturamento = await axios.get(`${participa}/faturamento-periodo/${data}`, {
    headers: { token: localStorage.getItem('token') },
  });
  return faturamento.data.faturamentoPorPeriodo;
}

export async function getParticipantes(data) {
  const relatorios = await axios.get(
    `${participa}/data/${data}`,
    { headers: { token: localStorage.getItem('token') } },
  ).catch(ex => {
    console.warn(ex);
    return false;
  });

  return relatorios && !relatorios.msg ? relatorios.data : false;
}