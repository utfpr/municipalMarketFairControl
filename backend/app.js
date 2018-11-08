const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const feirante = require('./routes/feirante');
const feira = require('./routes/feira');
const login = require('./routes/login');
const supervisor = require('./routes/supervisor');
const celula = require('./routes/celula');
const categoria = require('./routes/categoria');
const subcategoria = require('./routes/subcategoria');
const participa = require('./routes/participa');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/feirante', feirante);
app.use('/login', login);
app.use('/supervisor', supervisor);
app.use('/celula', celula);
app.use('/feira', feira);
app.use('/categoria', categoria);
app.use('/subcategoria', subcategoria);
app.use('/participa', participa);

module.exports = app;
