/* eslint-disable */

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var login = require('./routes/login');
var supervisor = require('./routes/supervisor');

app.get('/', (req, res) => {
    console.log("logadaço");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/login', login);
app.use('/supervisor', supervisor);



module.exports = app;
