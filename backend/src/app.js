const express = require('express');

const app = express();

app.use('/exemplo', require('./routes/exemplo'));

module.exports = app;
