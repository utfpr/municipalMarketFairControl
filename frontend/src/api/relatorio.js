import axios from 'axios';

const feira = 'http://localhost:3000/api/feira';
const participa = 'http://localhost:3000/api/participa';

export async function getFeiras() {
  const feiras = (await axios.get(
    feira,
    { headers: { token: localStorage.getItem('token') } },
  )).data;

  return feiras;
}

export async function getParticipantes(data) {
  return (await axios.get(
    `${participa}/data/${data}`,
    { headers: { token: localStorage.getItem('token') } },
  )).data;
}