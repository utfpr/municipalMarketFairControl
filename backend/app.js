const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const feira = require('./routes/feira');
const login = require('./routes/login');
const supervisor = require('./routes/supervisor');
const celula = require('./routes/celula');
const testes = require('./routes/testes');
const categoria = require('./routes/categoria');
const subcategoria = require('./routes/subcategoria');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', login);
app.use('/supervisor', supervisor);
app.use('/celula', celula);
app.use('/feira', feira);
app.use('/categoria', categoria);
app.use('/subcategoria', subcategoria);

// Gambiarra. Remover depois.
app.use('/testes', testes);

module.exports = app;
