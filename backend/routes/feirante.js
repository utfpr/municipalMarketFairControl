const express = require('express');
const { body, param, validationResult } = require('express-validator/check');
const { isCpf, isCnpj, isEndereco } = require('./utils');

const router = express.Router();

const subCategoriaController = require('../controllers/subcategoria');
const feiranteController = require('../controllers/feirante');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/',
  authMiddleware.isSupervisor,
  [
    body('cpf').custom(isCpf),
    body('cnpj')
    .custom(isCnpj)
    .optional(),
    body('nome')
      .isString()
      .isLength({ min: 1, max: 100 }),
    body('rg')
      .isString()
      .isLength({ min: 9, max: 9 }),
    body('usa_ee').isBoolean(),
    body('nome_fantasia')
      .optional()
      .isString()
      .isLength({ min: 0, max: 100 }),
    body('razao_social')
      .optional()
      .isString()
      .isLength({ min: 0, max: 100 }),
    body('comprimento_barraca').isDecimal(),
    body('largura_barraca').isDecimal(),
    body('endereco').custom(isEndereco),
    body('voltagem_ee')
      .optional(),
    body('sub_categoria_id').isInt(),
    body('senha')
      .isString()
      .isLength({ min: 6, max: 100 }),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).send();

    const {
      cpf,
      cnpj,
      nome,
      rg,
      usa_ee,
      nome_fantasia,
      razao_social,
      comprimento_barraca,
      largura_barraca,
      endereco,
      voltagem_ee,
      sub_categoria_id,
      senha,
    } = req.body;

    const subcategoria = await subCategoriaController.findSubcategoriaById(sub_categoria_id);
    if (subcategoria === null) return res.json({ msg: 'subcategoria_nao_existe' });

    const feirante = await feiranteController.findFeiranteByCpf(cpf);
    if (feirante !== null) return res.json({ msg: 'cpf_existente' });

    const ret = await feiranteController.addFeirante(
      cpf,
      rg,
      nome,
      cnpj,
      senha,
      usa_ee,
      nome_fantasia,
      razao_social,
      comprimento_barraca,
      largura_barraca,
      endereco,
      voltagem_ee,
      sub_categoria_id,
    );

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
  },
);

router.get('/', authMiddleware.isSupervisor, async (req, res) => {
  const feirantes = await feiranteController.listFeirante();
  return res.json(
    feirantes.map(feirante => ({
      cpf: feirante.cpf,
      cnpj: feirante.cnpj,
      nome: feirante.nome,
      rg: feirante.rg,
      usa_ee: feirante.usa_ee,
      nome_fantasia: feirante.nomeFantasia,
      razao_social: feirante.razaoSocial,
      comprimento_barraca: feirante.comprimento_barraca,
      largura_barraca: feirante.largura_barraca,
      endereco: {
        logradouro: feirante.endereco.logradouro,
        bairro: feirante.endereco.bairro,
        numero: feirante.endereco.numero,
        cep: feirante.endereco.cep,
      },
      voltagem_ee: feirante.voltagem_ee,
      sub_categoria_id: feirante.subCategoriaId,
    })),
  );
});

router.get('/:cpf', [param('cpf').custom(isCpf)], authMiddleware.isSupervisor, async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.status(400).send();

  const { cpf } = req.params;

  const feirante = await feiranteController.findFeiranteByCpf(cpf);
  if (feirante === null) return res.json({ msg: 'cpf_nao_existente' });

  return res.json({
    cpf: feirante.cpf,
    cnpj: feirante.cnpj,
    nome: feirante.nome,
    rg: feirante.rg,
    usa_ee: feirante.usaEe,
    nome_fantasia: feirante.nomeFantasia,
    razao_social: feirante.razaoSocial,
    comprimento_barraca: feirante.comprimentoBarraca,
    largura_barraca: feirante.larguraBarraca,
    endereco: {
      logradouro: feirante.endereco.logradouro,
      bairro: feirante.endereco.bairro,
      numero: feirante.endereco.numero,
      cep: feirante.endereco.CEP,
    },
    voltagem_ee: feirante.voltagemEe,
    sub_categoria_id: feirante.subCategoriaId,
  });
});

router.put(
  '/:cpf',
  authMiddleware.isSupervisor,
  [
    param('cpf').custom(isCpf),
    body('cnpj')
      .optional()
      .custom(isCnpj),
    body('nome')
      .optional()
      .isString()
      .isLength({ min: 1, max: 100 }),
    body('rg')
      .optional()
      .isString()
      .isLength({ min: 9, max: 9 }),
    body('usa_ee')
      .optional()
      .isBoolean(),
    body('nome_fantasia')
      .optional(),
    body('razao_social')
      .optional(),
    body('comprimento_barraca')
      .optional()
      .isDecimal(),
    body('largura_barraca')
      .optional()
      .isDecimal(),
    body('endereco')
      .optional()
      .custom(isEndereco),
    body('voltagem_ee')
      .optional(),
    body('sub_categoria_id')
      .optional()
      .isInt(),
    body('senha')
      .optional()
      .isString()
      .isLength({ min: 6, max: 100 }),
  ],
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).send();

    const { cpf } = req.params;

    const {
      cnpj,
      nome,
      rg,
      senha,
      usa_ee,
      nome_fantasia,
      razao_social,
      comprimento_barraca,
      largura_barraca,
      endereco,
      voltagem_ee,
      sub_categoria_id,
    } = req.body;

    if (sub_categoria_id !== undefined) {
      const subcategoria = await subCategoriaController.findSubcategoriaById(sub_categoria_id);
      if (subcategoria === null) return res.json({ msg: 'subcategoria_nao_existe' });
    }

    const feirante = await feiranteController.findFeiranteByCpf(cpf);
    if (feirante === null) return res.json({ msg: 'cpf_nao_existente' });

    // Isso permite tornar os atributos opcionais (atualiza somente o que precisar)
    const ret = await feiranteController.updateFeirante(cpf, {
      ...(cnpj !== undefined ? { cnpj } : {}),
      ...(nome !== undefined ? { nome } : {}),
      ...(rg !== undefined ? { rg } : {}),
      ...(senha !== undefined ? { senha } : {}),
      ...(usa_ee !== undefined ? { usa_ee } : {}),
      ...(nome_fantasia !== undefined ? { nome_fantasia } : {}),
      ...(razao_social !== undefined ? { razao_social } : {}),
      ...(comprimento_barraca !== undefined ? { comprimento_barraca } : {}),
      ...(largura_barraca !== undefined ? { largura_barraca } : {}),
      ...(endereco !== undefined ? { endereco } : {}),
      ...(voltagem_ee !== undefined ? { voltagem_ee } : {}),
      ...(sub_categoria_id !== undefined ? { sub_categoria_id } : {}),
    });

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
  },
);

router.delete(
  '/:cpf',
  [param('cpf').custom(isCpf)],
  authMiddleware.isSupervisor,
  async (req, res) => {
    if (!validationResult(req).isEmpty()) return res.status(400).send();

    const { cpf } = req.params;

    const feirante = await feiranteController.findFeiranteByCpf(cpf);
    if (feirante === null) return res.json({ msg: 'cpf_nao_existente' });

    const ret = await feiranteController.deleteFeirante(cpf);
    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
  },
);

// router.get('/:cpf/participacoes')

// router.post('/confirma', [body('periodo').isInt({ min: 1, max: 3 })], (req, res) => {});

module.exports = router;
