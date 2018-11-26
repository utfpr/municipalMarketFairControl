const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const avisoController = require('../controllers/aviso');

router.get('/', async (req, res) => {
  const aviso = await avisoController.getAvisos();
  res.status(200).send(aviso);
});

router.post('/', authMiddleware.isSupervisor, async (req, res) => {
  const { assunto, texto } = req.body;

  const add = await avisoController.addAviso(assunto, texto);
  if (add !== null) {
    res.status(200).send({
      msg: 'ok',
    });
  } else {
    res.status(200).send({
      msg: 'erro',
    });
  }
});

router.put('/', authMiddleware.isSupervisor, async (req, res) => {
  const { id, assunto, texto } = req.body;
  const update = await avisoController.removeAviso(id, assunto, texto);

  if (update !== null) {
    res.status(200).send({
      msg: 'ok',
    });
  } else {
    res.status(200).send({
      msg: 'erro',
    });
  }
});

router.delete('/', authMiddleware.isSupervisor, async (req, res) => {
  const { id } = req.body;

  const remove = await avisoController.removeAviso(id);
  if (remove !== null) {
    res.status(200).send({
      msg: 'ok',
    });
  } else {
    res.status(200).send({
      msg: 'erro',
    });
  }
});

module.exports = router;
