const express = require('express');

const app = express();

app.use('/feirante', require('./routes/feirante'));

module.exports = app;
