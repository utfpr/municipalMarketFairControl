const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const constrollerFeira = require('../controllers/feira');


router.get('/info', authMiddleware.isSupervisor, authMiddleware.isFeirante, async (req, res) => {
  const feira = await constrollerFeira.feiraInfo();
  if (feira != null) {
    res.status(200).send(feira);
  } else {
    res.status(200).send({
      msg: 'feira_invalida',
    });
  }
});


router.post('/', authMiddleware.isSupervisor, async (req, res) => {
  const { data } = req.body;

  if (data == null) {
    res.status(400);
  }
  const date = new Date();

  const dataSplitted = data.split('/');

  if (data.getDate() >= dataSplitted[0].parseInt()
  || date.getMonth() >= dataSplitted[1].parseInt()
  || date.getFullYear >= dataSplitted[2].parseInt()) {
    res.status(200).send({
      msg: 'data_nao_permitida',
    });
  } else {
    const feira = await constrollerFeira.addFeira(data);

    if (feira == null) {
      res.status(400);
    } else {
      res.status(200).send({
        msg: 'ok',
      });
    }
  }
});
router.post('/cancelar', authMiddleware.isSupervisor, async (req, res) => {
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
