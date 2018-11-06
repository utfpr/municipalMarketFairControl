import axios from 'axios';

const host = 'http://localhost:3000/categoria';

export async function get() {
    return (await axios.get(host)).data;
}

export async function post(nome, needcnpj) {
    await axios.post(host, {
        nome,
        needcnpj,
    });
}

export async function put(nome, needcnpj) {
    await axios.put(`${host}/${id}`, {
        nome,
        needcpnj,
    });
}

export async function del(id) {
    axios.delete(`${host}/${id}`);
}