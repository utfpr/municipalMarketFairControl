const router = require('express').Router();
const CPF = require('cpf-check');
const authMiddleware = require('../middlewares/auth');
const supervisorController = require('../controllers/supervisor');

// get supervisores
router.get('/', async (req, res) => {
  const supervisores = await supervisorController.listSupervisor();
  res.status(200).send(supervisores);
});
// get supervisor
// authMiddleware.isAdmin,
router.get('/:cpf', authMiddleware.isAdmin, async (req, res) => {
  const cpfS = req.params.cpf;

  const cpfValido = CPF.validate(CPF.strip(cpfS));
  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH') {
    // validação cpf
    res.status(400).send();
  }

  const supervisor = await supervisorController.findSupervisorByCpf(cpfS);
  if (supervisor != null) {
    res.status(200).send(supervisor);
  } else {
    res.status(200).send({
      msg: 'cpf_nao_existe',
    });
  }
});

// post cadastro supervisor
router.post('/', authMiddleware.isAdmin, async (req, res) => {
  const cpfS = req.body.cpf;
  const nomeS = req.body.nome;
  const senhaS = req.body.senha;
  const isAdm = req.body.is_adm;

  const cpfValido = CPF.validate(CPF.strip(cpfS));
  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH' || senhaS.lenght < 6) {
    // validação cpf e tamanho da senha
    res.status(400);
  } else {
    // retorna null se cpf não existir
    const cpfExist = await supervisorController.findSupervisorByCpf(CPF.strip(cpfS));

    let resposta = '';
    if (cpfExist == null) {
      // cpf não consta na base de dados, pode ser cadastrado
      const cadastro = await supervisorController.addSupervisor(
        CPF.strip(cpfS),
        nomeS,
        senhaS,
        isAdm,
      );
      if (cadastro != null) {
        resposta = 'ok';
      }
    } else {
      resposta = 'cpf_existente'; // Não pode cadastrar o mesmo cpf duas vezes
    }

    res.status(200).send({
      msg: resposta,
    });
  }
});

// put update supervisor
router.put('/:cpf', authMiddleware.isAdmin, async (req, res) => {
  const { nome, senha } = req.body;
  const isAdm = req.body.is_adm;
  const cpfS = req.params.cpf;

  const cpfValido = CPF.validate(CPF.strip(cpfS));

  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH') {
    // validação cpf
    res.status(400);
  }

  const supervisorValidate = await supervisorController.findSupervisorByCpf(cpfS);

  if (supervisorValidate != null) {
    // supervisor encontrado
    // const status = true; // WTF?
    // const supervisor =
    // await supervisorController.updateSupervisor(cpfS, { status, nome, senha });

    const supervisor = await supervisorController.updateSupervisor(cpfS, {
      ...(nome !== undefined ? { nome } : {}),
      ...(senha !== undefined ? { senha } : {}),
      ...(isAdm !== undefined ? { is_adm: isAdm } : {}),
    });

    if (supervisor != null) {
      res.status(200).send({
        msg: 'ok',
      });
    }
  } else {
    // supervisor nao encotrado
    res.status(200).send({
      msg: 'cpf_nao_existente',
    });
  }
});

// delete remove supervisor
router.delete('/:cpf', authMiddleware.isAdmin, async (req, res) => {
  const cpfS = req.params.cpf;

  const cpfValido = CPF.validate(cpfS);

  if (cpfValido.code === 'INVALID' || cpfValido.code === 'LENGTH') {
    // validação cpf
    return res.status(400);
  }

  const supervisorValidate = await supervisorController.findSupervisorByCpf(cpfS);

  if (supervisorValidate != null) {
    // Possível problema no futuro: E se o ultimo administrador for excluido?
    const admins = (await supervisorController.listSupervisor()).filter(
      supervisor => supervisor.is_adm,
    );
    if (admins.length <= 1) {
      return res.send({
        msg: 'ultimo_admin',
      });
    }

    // supervisor encontrado
    const supervisor = await supervisorController.deleteSupervisor(cpfS);
    if (supervisor != null) {
      // supervisor "removido"
      return res.status(200).send({
        msg: 'ok',
      });
    }
  }
  // supervisor nao encontrado
  return res.status(200).send({
    msg: 'cpf_nao_existente',
  });
});

module.exports = router;
