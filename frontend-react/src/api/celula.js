import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/celula`;

export  async function get() {
  const info = await axios
    .get(host, {
      headers: { token: localStorage.getItem('token') },
    })
    .catch(() => null);
  return info ? info.data : [];
}
