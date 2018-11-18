import axios from 'axios';

const host = 'http://localhost:3000/api/supervisor/';

export async function get() {
  const data = await axios
    .get(host, { headers: { token: localStorage.getItem('token') } })
    .catch(() => null)
    .then(record => record.data);

  return data.map(record => ({
    ...record,
    cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4'),
  }));
}

export async function getByCpf(cpf) {
  const record = (await axios.get(host + cpf, {
    headers: { token: localStorage.getItem('token') },
  })).data;
  return { ...record, cpf: record.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4') };
}

export async function post(cpf, nome, senha, isAdm) {
  await axios.post(
    host,
    {
      cpf,
      nome,
      senha,
      is_adm: isAdm,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function put(cpf, nome, isAdm) {
  await axios.put(
    `${host}${cpf}`,
    {
      nome,
      is_adm: isAdm,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function del(cpf) {
  axios.delete(`${host}${cpf}`);
}
