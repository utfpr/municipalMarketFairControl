const log = require('node-pretty-log');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log('info', `Servidor rodando na porta ${port}`);
});
