const express = require('express');
const { check, validationResult } = require('express-validator/check');
const CPF = require('cpf-check');

const router = express.Router();
const celulaController = require('../controllers/celula');
const feiranteController = require('../controllers/feirante');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isSupervisor, async (req, res) => {
  const celulas = await celulaController.listCelulas();
  return res.json(
    celulas.map(celula => ({ cpf_feirante: celula.cpf_feirante, periodo: celula.periodo })),
  );
});

router.get('/:id', authMiddleware.isSupervisor, [check('id').isInt()], async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json({ msg: 'id_nao_existente' });

  const { id } = req.params;
  const celula = await celulaController.findCelula(id);

  if (celula === null) return res.json({ msg: 'id_nao_existente' });

  return res.json({ cpf_feirante: celula.cpf_feirante, periodo: celula.periodo });
});

router.put(
  '/:id',
  authMiddleware.isSupervisor,
  [check('id').isInt(), check('cpf_feirante').isString(), check('periodo').isInt()],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).send();

    const cpfFeirante = req.body.cpf_feirante;
    const { periodo } = req.body;
    const { id } = req.params;

    if (CPF.validate(CPF.strip(cpfFeirante))) return res.status(400).send();

    const feirante = await feiranteController.findFeiranteByCpf(cpfFeirante);
    if (feirante === null) return res.json({ msg: 'cpf_nao_existente' });

    const celula = await celulaController.findCelula(id);
    if (celula === null) return res.json({ msg: 'id_nao_existe' });

    const atualizado = await celulaController.updateCelula(id, cpfFeirante, periodo);
    if (atualizado === null) return res.json({ msg: 'celula_nao_atualizada' });

    return res.json({ msg: 'ok' });
  },
);
module.exports = router;
