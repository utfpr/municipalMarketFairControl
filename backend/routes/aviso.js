const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const avisoController = require('../controllers/aviso');

router.get('/', async (req, res) => {
  const aviso = await avisoController.getAvisos();
  res.status(200).send(aviso);
});

router.get('/proxima', async (req, res) => {
  const aviso = await avisoController.getAvisosProximaFeira();
  res.status(200).send(aviso);
});

router.post('/', authMiddleware.isSupervisor, async (req, res) => {
  const { assunto, texto, data_feira } = req.body;

  const add = await avisoController.addAviso(assunto, texto, data_feira);
  if (add !== null) {
    res.status(200).send({
      msg: 'ok',
    });
  } else {
    res.status(400).send({
      msg: 'erro',
    });
  }
});

router.put('/:id', authMiddleware.isSupervisor, async (req, res) => {
  const { id } = req.params;
  const { assunto, texto, data_feira } = req.body;

  const update = await avisoController.updateAviso(id, assunto, texto, data_feira);

  if (update !== null) {
    res.status(200).send({
      msg: 'ok',
    });
  } else {
    res.status(400).send({
      msg: 'erro',
    });
  }
});

router.get('/:id', authMiddleware.isSupervisor, async (req, res) => {
  const { id } = req.params;

  const byId = await avisoController.getById(id);
  if (byId !== null) {
    res.status(200).send(byId);
  } else {
    res.status(400).send({
      msg: 'erro',
    });
  }
});

router.delete('/:id', authMiddleware.isSupervisor, async (req, res) => {
  const { id } = req.params;

  const remove = await avisoController.removeAviso(id);
  if (remove !== null) {
    res.status(200).send({
      msg: 'ok',
    });
  } else {
    res.status(400).send({
      msg: 'erro',
    });
  }
});

module.exports = router;
