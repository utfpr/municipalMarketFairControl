const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const login = require('./routes/login');
const supervisor = require('./routes/supervisor');
const testes = require('./routes/testes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', login);
app.use('/supervisor', supervisor);

// Gambiarra. Remover depois.
app.use('/testes', testes);

module.exports = app;

