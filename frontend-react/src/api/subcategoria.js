import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/subcategoria`;

export async function post(nome, categoria_id) {
  await axios.post(
    host, {
      nome,
      categoria_id,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export function put(nome, id) {
  return axios.put(
    `${host}/${id}`,
    {
      nome,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function getSubById(id) {
  const record = (await axios.get(`${host}/${id}`, {
    headers: { token: localStorage.getItem('token') },
  })).data;
  return { ...record };
}
  
export async function getCatBySub(id) {
  return axios.get(`${host}/${id}/categoria`, {
    headers: { token: localStorage.getItem('token') },
  });
}

export async function deleteSub(id) {
  const record = (await axios.delete(`${host}/${id}`, {
    headers: { token: localStorage.getItem('token') },
  })).data;
  return { ...record };
}