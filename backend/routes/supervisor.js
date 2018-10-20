const CPF = require('cpf-check');
const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const supervisorController = require('../controllers/supervisor');


// get supervisores
router.get('/', authMiddleware.isAdmin, async (req, res) => {
  const supervisores = await supervisorController.listSupervisor();
  res.status(200).send(supervisores);
});
// get supervisor
router.get('/:cpfSupervisor', authMiddleware.isAdmin, async (req, res) => {
  const cpfS = req.params.cpfSupervisor;

  const cpfValido = CPF.validate(CPF.strip(cpfS));
  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH') {
    // validação cpf
    res.status(400).send();
  }

  const supervisor = await supervisorController.findSupervisorByCpf(cpfS);
  if (supervisor != null) {
    res.status(200).send(supervisor);
  } else {
    res.status(200).send('cpf_nao_existe');
  }
});

// post cadastro supervisor
router.post('/', authMiddleware.isAdmin, async (req, res) => {
  const { cpf, senha } = req.body;

  const cpfValido = CPF.validate(CPF.strip(cpf));
  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH' || senha.lenght < 6) {
    // validação cpf e tamanho da senha
    res.status(400).send('error');
  } else {
    // retorna null se cpf não existir
    const cpfExist = await supervisorController.findSupervisorByCpf(cpf);

    let resposta = '';
    if (cpfExist == null) {
      // cpf não consta na base de dados, pode ser cadastrado
      resposta = 'ok';
    } else {
      resposta = 'cpf_existente'; // Não pode cadastrar o mesmo cpf duas vezes
    }

    res.status(200).send(resposta);
  }
});

// put update supervisor
router.put('/:cpfSupervisor', authMiddleware.isAdmin, async (req, res) => {
  const { nome, senha } = req.body;
  const cpfS = req.params.cpfSupervisor;

  const cpfValido = CPF.validate(CPF.strip(cpfS));

  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH') {
    // validação cpf
    res.status(400);
  }

  const supervisorValidate = await supervisorController.findSupervisorByCpf(cpfS);

  if (supervisorValidate != null) {
    // supervisor encontrado
    const status = true;
    const supervisor = supervisorController.updateSupervisor(cpfS, { status, nome, senha });

    if (supervisor != null) {
      res.status(200).send('ok');
    }
  } else {
    // supervisor nao encotrado
    res.status(200).send('cpf_nao_existente');
  }
});

// delete remove supervisor
router.delete('/:cpfSupervisor', authMiddleware.isAdmin, async (req, res) => {
  const cpfS = req.params.cpfSupervisor;

  const cpfValido = CPF.validate(CPF.strip(cpfS));

  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH') {
    // validação cpf
    res.status(400);
  }

  const supervisorValidate = await supervisorController.findSupervisorByCpf(cpfS);

  if (supervisorValidate != null) {
    // supervisor encontrado
    const supervisor = supervisorController.deleteSupervisor(cpfS);
    if (supervisor != null) {
      // supervisor "removido"
      res.status(200).send('ok');
    }
  } else {
    // supervisor nao encontrado
    res.status(200).send('cpf_nao_existente');
  }
});

module.exports = router;
