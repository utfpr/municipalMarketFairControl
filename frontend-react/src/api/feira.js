import axios from 'axios';

const host = 'http://localhost:3000/api/feira/';

export async function get() {
  const info = await axios
    .get(`${host}info`, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null);

  return info === null ? null : info.data;
}
