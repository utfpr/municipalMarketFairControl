import axios from 'axios';

const host = `${process.env.REACT_APP_HOST}/supervisor`;

const formatCPF = cpf => {
  return cpf.replace('.', '').replace('.', '').replace('-', '');
}

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
      is_adm: isAdm ? 1 : 0,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export async function put(cpf, nome, isAdm, senha) {
  const cleanedCPF = formatCPF(cpf);
  await axios.put(
    `${host}/${cleanedCPF}`,
    {
      nome,
      is_adm: isAdm,
      senha,
    },
    { headers: { token: localStorage.getItem('token') } },
  );
}

export function del(cpf) {
  const cleanedCPF = formatCPF(cpf);
  return axios.delete(`${host}/${cleanedCPF}`, { headers: { token: localStorage.getItem('token') } });
}
