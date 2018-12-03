import axios from 'axios';

const host = 'http://localhost:3000/api/categoria';

export async function get() {
  const data = await axios
  .get(host, { headers: { token: localStorage.getItem('token') } })
  .catch(() => null)
  .then(record => record.data);

  return data.map(record => ({
    ...record,
  }));
}

export async function post(nome, need_cnpj) {
  need_cnpj = need_cnpj ? 1 : 0;
  await axios.post(
    host, {
      nome,
      need_cnpj,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function put(id, nome, need_cnpj) {
  await axios.put(
    `${host}/${id}`,
    {
      nome,
      need_cnpj,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function del(id) {
  axios.delete(
    `${host}/${id}`,
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function getSub(id) {
  const data = await axios
  .get(`${host}/${id}/subcategorias`, { headers: { token: localStorage.getItem('token') } })
  .catch(() => null)
  .then(record => record.data);

  return data.map(record => ({
    ...record,
  }));
}