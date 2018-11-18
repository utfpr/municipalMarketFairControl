import axios from 'axios';

const host = 'http://localhost:3000/categoria';

export async function get() {
  return (await axios.get(host)).data;
}

export async function post(nome, need_cnpj) {
  need_cnpj = need_cnpj ? 1 : 0;
  await axios.post(host, {
    nome,
    need_cnpj,
  });
}

export async function put(id, nome, need_cnpj) {
  await axios.put(`${host}/${id}`, {
    nome,
    need_cnpj,
  });
}

export async function del(id) {
  axios.delete(`${host}/${id}`);
}
