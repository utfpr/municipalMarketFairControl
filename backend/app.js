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

const router = express.Router();

router.use('/feirante', feirante);
router.use('/login', login);
router.use('/supervisor', supervisor);
router.use('/celula', celula);
router.use('/feira', feira);
router.use('/categoria', categoria);
router.use('/subcategoria', subcategoria);
router.use('/participa', participa);

app.use('/api', router);

module.exports = app;
