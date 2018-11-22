import axios from 'axios';

const host = 'http://localhost:3000/categoria';

export async function get() {
  return (await axios.get(host), { token: localStorage.getItem('token') }).data;
}

export async function post(nome, need_cnpj) {
  need_cnpj = need_cnpj ? 1 : 0;
  await axios.post(
    host, {
      nome,
      need_cnpj,
    },
    { token: localStorage.getItem('token') },
  );
}

export async function put(id, nome, need_cnpj) {
  await axios.put(
    `${host}/${id}`,
    {
      nome,
      need_cnpj,
    },
    { token: localStorage.getItem('token') },
  );
}

export async function del(id) {
  axios.delete(
    `${host}/${id}`,
    { token: localStorage.getItem('token') },
  );
}

export async function getSub(id, callback) {
  callback((await axios.get(
    `${host}/${id}/subcategorias`,
    { token: localStorage.getItem('token') },
  )).data);
}
