import axios from 'axios';

const host = 'http://localhost:3000/api/feira';

export async function listFeiras() {
  const info = await axios
    .get(host, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null);

  return info === null ? null : info.data;
};

export async function feiraAtual() {
  const feira = await axios
    .get(`${host}/info`, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null);

  return feira ? feira.data : {};
};

export async function post(data) {
  const feira = await axios
    .post(host, { data }, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null);

  return Boolean(feira);
};

export async function deletaUltimaFeira() {
  const feira = await axios
    .delete(host, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null);

  return feira;
};

export async function alteraStatusFeira(data) {
  const feira = await axios
    .put(`${host}/altera-status`, { data }, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null);

  return feira;
};
