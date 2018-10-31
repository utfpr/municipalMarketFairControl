const router = require('express').Router();
// const authMiddleware = require('../middlewares/auth');
const constrollerFeira = require('../controllers/feira');

router.get('/info', async (req, res) => {
  const feira = await constrollerFeira.feiraInfo();
  if (feira != null) {
    res.status(200).send(feira);
  } else {
    res.status(200).send({
      msg: 'feira_invalida',
    });
  }
});


router.post('/', async (req, res) => {
  const dataA = req.body.data;

  if (dataA == null) {
    res.status(400);
  }

  const dataSplitted = [dataA.slice(0, 2), dataA.slice(3, 5), dataA.slice(6, 10)];
  const date = new Date();

  if (date.getDate() > dataSplitted[0].parseInt
  || date.getMonth() >= dataSplitted[1].parseInt
  || date.getFullYear() >= dataSplitted[2].parseInt) {
    res.status(200).send({
      msg: 'data_nao_permitida',
    });
  } else {
    const feira = await constrollerFeira.addFeira(dataA.replace('/', '-').replace('/', '-'));

    if (feira == null) {
      res.status(400);
    } else {
      res.status(200).send({
        msg: 'ok',
      });
    }
  }
});
router.post('/cancelar', async (req, res) => {
  const feira = await constrollerFeira.calcelaFeira();

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
