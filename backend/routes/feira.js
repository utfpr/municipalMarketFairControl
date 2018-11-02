const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const constrollerFeira = require('../controllers/feira');

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
  if (dataA === null || dataA === undefined) {
    return res.status(400).send();
  }

  const dataSplitted = [dataA.slice(0, 2), dataA.slice(3, 5), dataA.slice(6, 10)];
  const date = new Date(dataSplitted[2], dataSplitted[1], dataSplitted[0]);

  // if (
  //   date.getDate() > dataSplitted[0].parseInt
  //   || date.getMonth() >= dataSplitted[1].parseInt
  //   || date.getFullYear() >= dataSplitted[2].parseInt
  // ) {
  if (date < new Date()) {
    return res.status(200).send({
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

router.post('/cancelar', authMiddleware.isSupervisor, async (req, res) => {
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
