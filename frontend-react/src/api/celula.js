import axios from 'axios';

const host = 'http://localhost:3000/api/celula';

export  async function get() {
  const info = await axios
    .get(host, {
      headers: { token: localStorage.getItem('token') },
    })
    .catch(() => null);
  return info ? info.data : [];
}
