const router = require('express').Router();
// const url = require('url');
// const fs = require('fs');

const authMiddleware = require('../middlewares/auth');
const constrollerFeira = require('../controllers/feira');


router.get('/', authMiddleware.isSupervisor, async (req, res) => {
  const feiras = await constrollerFeira.listFeiras();
  if (feiras !== null) {
    res.status(200).send(feiras);
  } else {
    res.status(200).send({
      msg: 'nenhuma feira',
    });
  }
});

router.get('/info', authMiddleware.isFeiranteOrSupervisor, async (req, res) => {
  const feira = await constrollerFeira.feiraAtualInfo();
  if (feira !== null) {
    res.status(200).send(feira);
  } else {
    res.status(400).send({
      msg: 'feira_invalida',
    });
  }
});

router.post('/', authMiddleware.isSupervisor, async (req, res) => {
  const { data, photo } = req.body;
  if (!data) {
    return res.status(400).send();
  }

  const date = new Date(data);
  if (date < new Date()) {
    return res.status(400).send({
      msg: 'data_nao_permitida',
    });
  }

  const feira = await constrollerFeira.addFeira(date, photo);

  if (feira === null) {
    return res.status(400).send();
  }
  return res.status(200).send({
    file: req.file,
    msg: 'ok',
  });
});

router.put('/altera-status', authMiddleware.isSupervisor, async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).send({
      msg: 'data_nao_informada',
    });
  }

  const newDate = new Date(data);

  if (newDate < new Date()) {
    return res.status(400).send({
      msg: 'nao_pode_cancelar_feira_ja_realizada',
    });
  }

  const feira = await constrollerFeira.alteraFeiraStatus(data);

  if (feira === null) {
    return res.status(400).send({
      msg: 'feira_nao_cancelada',
    });
  }

  return res.status(200).send({
    msg: 'ok',
  });
});

module.exports = router;
