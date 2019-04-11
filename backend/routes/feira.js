const router = require('express').Router();
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
    res.status(200).send({
      msg: 'feira_invalida',
    });
  }
});

router.post('/', authMiddleware.isSupervisor, async (req, res) => {
  const dataA = req.body.data;
  if (!dataA) {
    return res.status(400).send();
  }

  const dataSplitted = [dataA.slice(0, 2), dataA.slice(2, 4), dataA.slice(4, 8)];
  const date = new Date(dataSplitted[2], dataSplitted[1] - 1, dataSplitted[0]);
  // if (
  //   date.getDate() > dataSplitted[0].parseInt
  //   || date.getMonth() >= dataSplitted[1].parseInt
  //   || date.getFullYear() >= dataSplitted[2].parseInt
  // ) {
  if (date < new Date()) {
    return res.status(400).send({
      msg: 'data_nao_permitida',
    });
  }

  const feira = await constrollerFeira.addFeira(date);


  if (feira === null) {
    return res.status(400).send();
  }
  return res.status(200).send({
    msg: 'ok',
  });
});

router.delete('/', authMiddleware.isSupervisor, async (req, res) => {
  const feira = await constrollerFeira.cancelaFeiraAtual();

  if (feira == null) {
    res.status(200).send({
      msg: 'feira_nao_cancelada',
    });
  } else {
    res.status(200).send({
      msg: 'ok',
    });
  }
});

module.exports = router;
