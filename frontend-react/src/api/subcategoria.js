import axios from 'axios';

const host = 'http://localhost:3000/api/subcategoria';

export async function getSubById(id) {
  const record = (await axios.get(`${host}/${id}`, {
    headers: { token: localStorage.getItem('token') },
  })).data;
  return { ...record };
}
  
export async function getCatBySub(id) {
  console.log(id);
  const record = (await axios.get(`${host}/${id}/categoria`, {
    headers: { token: localStorage.getItem('token') },
  })).data;
  return { ...record };
}