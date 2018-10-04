/* eslint-disable */

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var login = require('./routes/login');

app.get('/', (req, res) => {
    console.log("logadaço");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/login', login);



module.exports = app;
