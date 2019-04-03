import axios from 'axios';

const host = 'http://localhost:3000/api/date';

export default async function getDate() {
    let r;
    await axios.get(host)
    .then(res =>{
        r = res.data
    })
    .catch(e => console.log(e));
    
    return r;
  }