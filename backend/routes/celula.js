const express = require('express');
const { body, param, validationResult } = require('express-validator/check');
const { isCpf } = require('./utils');

const router = express.Router();
const celulaController = require('../controllers/celula');
const feiranteController = require('../controllers/feirante');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isSupervisor, async (req, res) => {
  const celulas = await celulaController.listCelula();
  return res.json(celulas.map(celula => celula));
});

router.get('/:id', authMiddleware.isSupervisor, [param('id').isInt()], async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.status(400).send({ msg: 'id_nao_existente' });

  const { id } = req.params;
  const celula = await celulaController.findCelulaById(id);

  if (celula === null) return res.status(400).send({ msg: 'id_nao_existente' });

  return res.status(200).send(celula);
});

router.put(
  '/:id',
  authMiddleware.isSupervisor,
  [
    param('id').isInt(),
    body('cpf_feirante')
      .custom(isCpf)
      .optional(),
    body('periodo')
      .isInt({ min: 1, max: 3 })
      .optional(),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).send();

    const cpfFeirante = req.body.cpf_feirante;
    const { periodo } = req.body;
    const { id } = req.params;

    const celula = await celulaController.findCelulaById(id);
    if (celula === null) return res.status(400).send({ msg: 'id_nao_existente' });

    if (cpfFeirante !== undefined) {
      const feirante = await feiranteController.findFeiranteByCpf(cpfFeirante);
      if (feirante === null) return res.status(400).send({ msg: 'cpf_nao_existente' });
    }

    const atualizado = await celulaController.updateCelula(id, {
      ...(cpfFeirante !== undefined ? { cpf_feirante: cpfFeirante } : {}),
      ...(periodo !== undefined ? { periodo } : {}),
    });
    if (atualizado === null) return res.status(400).send({ msg: 'erro' });

    return res.status(200).send({ msg: 'ok' });
  },
);
module.exports = router;
