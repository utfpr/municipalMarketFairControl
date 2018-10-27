import axios from 'axios';

const host = 'https://a.com/api';

export async function get() {
  return [
    {
      cpf: '111.111.111-11',
      nome: 'Ademir',
      isAdm: true,
    },
    {
      cpf: '111.111.111-22',
      nome: 'Ademir 2',
      isAdm: false,
    },
  ];
  //  await axios.get(`${host}/supervisor`);
}

export async function post() {
  await axios.get(`${host}/supervisor`);
}
