const express = require('express');

const router = express.Router();

/**
 * @api {get} /feirante Lista todos os feirantes
 * @apiName ListFeirante
 * @apiGroup Feirante
 *
 * @apiHeader {String} Authorization JWT admin/supervisor
 * @apiHeaderExample {String} Headers
 *    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
 *    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 * @apiSuccess (Sucesso - 200) {Object[]} resposta Informações feirante
 * @apiSuccess (Sucesso - 200) {String} resposta.nome_fantasia Nome fantasia
 * @apiSuccess (Sucesso - 200) {String} resposta.razao_social Razão social
 * @apiSuccess (Sucesso - 200) {String} resposta.endereco Endereço
 * @apiSuccess (Sucesso - 200) {String} resposta.bairro Bairro
 * @apiSuccess (Sucesso - 200) {String} resposta.cidade Cidade
 * @apiSuccess (Sucesso - 200) {String} resposta.uf UF
 * @apiSuccess (Sucesso - 200) {String} resposta.cnpj CNPJ (não obrigatório)
 * @apiSuccess (Sucesso - 200) {String} resposta.inscricao_estadual Inscrição Estadual
 * @apiSuccess (Sucesso - 200) {String} resposta.telefone_fixo Telefone fixo
 * @apiSuccess (Sucesso - 200) {String} resposta.celular Celular
 * @apiSuccess (Sucesso - 200) {String} resposta.email Email
 * @apiSuccess (Sucesso - 200) {String} resposta.barraca Já tem barraca?
 * @apiSuccess (Sucesso - 200) {Number} resposta.id_categoria Id categoria
 * @apiSuccess (Sucesso - 200) {Number} resposta.energia Energia elétrica
 * @apiSuccess (Sucesso - 200) {Number} resposta.estimativa_energia Estimativa de carga de energia
 * @apiSuccess (Sucesso - 200) {String} resposta.uso_energia Uso da energia
 * @apiSuccess (Sucesso - 200) {Boolean} resposta.pode_sol Pode ficar no sol?
 * @apiSuccess (Sucesso - 200) {String} resposta.sem_sombra Como resolver o sol
 * @apiSuccess (Sucesso - 200) {String} resposta.data_inicio Data início
 * @apiSuccess (Sucesso - 200) {String} resposta.nome Nome feirante
 * @apiSuccess (Sucesso - 200) {String} resposta.rg RG feirante
 * @apiSuccess (Sucesso - 200) {String} resposta.cpf CPF feirante
 * @apiSuccessExample {json} Exemplo resposta
 *    {
 *      [
 *        {
 *          "nome_fantasia": "Barraca do Seu Jão",
 *          "razao_social": "Seu João LTDA",
 *          "endereco": "Rua Brasil, 111",
 *          "bairro": "Centro",
 *          "cidade": "Campo Mourão",
 *          "uf": "Paraná",
 *          "cnpj": "1111111111111" ou "",
 *          "inscricao_estadual": "123457" ou "",
 *          "telefone_fixo": "4435230000",
 *          "celular": "44999998888",
 *          "email": "jao@gmail.com",
 *          "barraca": "" ou "3x3" ou "5x5" ou "XxX",
 *          "id_categoria": 4,
 *          "energia": 0 ou 110 ou 220,
 *          "estimativa_energia": 500,
 *          "uso_energia": "Fogão",
 *          "pode_sol": true ou false,
 *          "sem_sombra": "" ou "Usar uma lona"
 *          "data_inicio": "31-12-2018",
 *          "nome": "João Amoedo",
 *          "rg": "111111111",
 *          "cpf": "11111111111"
 *        }
 *      ]
 *    }
 *
 * @apiError (Erro - 401) NaoAutorizado Não autorizado
 */
router.get('/', (req, res) => {
  res.send();
});

/**
 * @api {get} /feirante/:cpf Informações feirante
 * @apiName GetFeirante
 * @apiGroup Feirante
 *
 * @apiHeader {String} Authorization JWT admin/supervisor
 * @apiHeaderExample {String} Headers
 *    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
 *    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 * @apiParam  {String} cpf CPF feirante
 * @apiParamExample  {Number} Exemplo parâmetro query
 *    /feirante/11111111111
 *
 * @apiSuccess (Sucesso - 200) {Object} resposta Informações feirante
 * @apiSuccess (Sucesso - 200) {String} resposta.nome_fantasia Nome fantasia
 * @apiSuccess (Sucesso - 200) {String} resposta.razao_social Razão social
 * @apiSuccess (Sucesso - 200) {String} resposta.endereco Endereço
 * @apiSuccess (Sucesso - 200) {String} resposta.bairro Bairro
 * @apiSuccess (Sucesso - 200) {String} resposta.cidade Cidade
 * @apiSuccess (Sucesso - 200) {String} resposta.uf UF
 * @apiSuccess (Sucesso - 200) {String} resposta.cnpj CNPJ (não obrigatório)
 * @apiSuccess (Sucesso - 200) {String} resposta.inscricao_estadual Inscrição Estadual
 * @apiSuccess (Sucesso - 200) {String} resposta.telefone_fixo Telefone fixo
 * @apiSuccess (Sucesso - 200) {String} resposta.celular Celular
 * @apiSuccess (Sucesso - 200) {String} resposta.email Email
 * @apiSuccess (Sucesso - 200) {String} resposta.barraca Já tem barraca?
 * @apiSuccess (Sucesso - 200) {Number} resposta.id_categoria Id categoria
 * @apiSuccess (Sucesso - 200) {Number} resposta.energia Energia elétrica
 * @apiSuccess (Sucesso - 200) {Number} resposta.estimativa_energia Estimativa de carga de energia
 * @apiSuccess (Sucesso - 200) {String} resposta.uso_energia Uso da energia
 * @apiSuccess (Sucesso - 200) {Boolean} resposta.pode_sol Pode ficar no sol?
 * @apiSuccess (Sucesso - 200) {String} resposta.sem_sombra Como resolver o sol
 * @apiSuccess (Sucesso - 200) {String} resposta.data_inicio Data início
 * @apiSuccess (Sucesso - 200) {String} resposta.nome Nome feirante
 * @apiSuccess (Sucesso - 200) {String} resposta.rg RG feirante
 * @apiSuccess (Sucesso - 200) {String} resposta.cpf CPF feirante
 * @apiSuccessExample {json} Exemplo resposta
 *    {
 *      "nome_fantasia": "Barraca do Seu Jão",
 *      "razao_social": "Seu João LTDA",
 *      "endereco": "Rua Brasil, 111",
 *      "bairro": "Centro",
 *      "cidade": "Campo Mourão",
 *      "uf": "Paraná",
 *      "cnpj": "1111111111111" ou "",
 *      "inscricao_estadual": "123457" ou "",
 *      "telefone_fixo": "4435230000",
 *      "celular": "44999998888",
 *      "email": "jao@gmail.com",
 *      "barraca": "" ou "3x3" ou "5x5" ou "XxX",
 *      "id_categoria": 4,
 *      "energia": 0 ou 110 ou 220,
 *      "estimativa_energia": 500,
 *      "uso_energia": "Fogão",
 *      "pode_sol": true ou false,
 *      "sem_sombra": "" ou "Usar uma lona"
 *      "data_inicio": "31-12-2018",
 *      "nome": "João Amoedo",
 *      "rg": "111111111",
 *      "cpf": "11111111111"
 *    }
 *
 * @apiError (Erro - 400) NaoEncontrado Feirante não encontrado
 * @apiError (Erro - 401) NaoAutorizado Não autorizado
 */
router.get('/:id', (req, res) => {
  res.send();
});

/**
 * @api {post} /feirante Adiciona feirante
 * @apiName AddFeirante
 * @apiGroup Feirante
 *
 * @apiHeader {String} Authorization JWT admin/supervisor
 * @apiHeaderExample {String} Headers
 *    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
 *    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 * @apiParam (Sucesso - 200) {Object} resposta Informações feirante
 * @apiParam (Sucesso - 200) {String} resposta.nome_fantasia Nome fantasia
 * @apiParam (Sucesso - 200) {String} resposta.razao_social Razão social
 * @apiParam (Sucesso - 200) {String} resposta.endereco Endereço
 * @apiParam (Sucesso - 200) {String} resposta.bairro Bairro
 * @apiParam (Sucesso - 200) {String} resposta.cidade Cidade
 * @apiParam (Sucesso - 200) {String} resposta.uf UF
 * @apiParam (Sucesso - 200) {String} resposta.cnpj CNPJ (não obrigatório)
 * @apiParam (Sucesso - 200) {String} resposta.inscricao_estadual Inscrição Estadual
 * @apiParam (Sucesso - 200) {String} resposta.telefone_fixo Telefone fixo
 * @apiParam (Sucesso - 200) {String} resposta.celular Celular
 * @apiParam (Sucesso - 200) {String} resposta.email Email
 * @apiParam (Sucesso - 200) {String} resposta.barraca Já tem barraca?
 * @apiParam (Sucesso - 200) {Number} resposta.id_categoria Id categoria
 * @apiParam (Sucesso - 200) {Number} resposta.energia Energia elétrica
 * @apiParam (Sucesso - 200) {Number} resposta.estimativa_energia Estimativa de carga de energia
 * @apiParam (Sucesso - 200) {String} resposta.uso_energia Uso da energia
 * @apiParam (Sucesso - 200) {Boolean} resposta.pode_sol Pode ficar no sol?
 * @apiParam (Sucesso - 200) {String} resposta.sem_sombra Como resolver o sol
 * @apiParam (Sucesso - 200) {String} resposta.data_inicio Data início
 * @apiParam (Sucesso - 200) {String} resposta.nome Nome feirante
 * @apiParam (Sucesso - 200) {String} resposta.rg RG feirante
 * @apiParam (Sucesso - 200) {String} resposta.cpf CPF feirante
 * @apiParamExample  {json} Exemplo body
 *    {
 *      "nome_fantasia": "Barraca do Seu Jão",
 *      "razao_social": "Seu João LTDA",
 *      "endereco": "Rua Brasil, 111",
 *      "bairro": "Centro",
 *      "cidade": "Campo Mourão",
 *      "uf": "Paraná",
 *      "cnpj": "1111111111111" ou "",
 *      "inscricao_estadual": "123457" ou "",
 *      "telefone_fixo": "4435230000",
 *      "celular": "44999998888",
 *      "email": "jao@gmail.com",
 *      "barraca": "" ou "3x3" ou "5x5" ou "XxX",
 *      "id_categoria": 4,
 *      "energia": 0 ou 110 ou 220,
 *      "estimativa_energia": 500,
 *      "uso_energia": "Fogão",
 *      "pode_sol": true ou false,
 *      "sem_sombra": "" ou "Usar uma lona"
 *      "data_inicio": "31-12-2018",
 *      "nome": "João Amoedo",
 *      "rg": "111111111",
 *      "cpf": "11111111111"
 *    }
 *
 * @apiSuccess (Sucesso - 200) FeiranteAdicionado Feirante adicionado
 * @apiError (Erro - 400) DadosInvalidos Dados inválidos
 * @apiError (Erro - 401) NaoAutorizado Não autorizado
 */
router.post('/', (req, res) => {
  res.send();
});

/**
 * @api {put} /feirante Atualiza dados feirante
 * @apiName UpdateFeirante
 * @apiGroup Feirante
 *
 * @apiHeader {String} Authorization JWT admin/supervisor
 * @apiHeaderExample {String} Headers
 *    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
 *    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 * @apiParam  {String} cpf CPF feirante
 * @apiParamExample  {Number} Exemplo parâmetro query
 *    /feirante/11111111111
 *
 * @apiParam (Sucesso - 200) {Object} resposta Informações feirante
 * @apiParam (Sucesso - 200) {String} resposta.nome_fantasia Nome fantasia
 * @apiParam (Sucesso - 200) {String} resposta.razao_social Razão social
 * @apiParam (Sucesso - 200) {String} resposta.endereco Endereço
 * @apiParam (Sucesso - 200) {String} resposta.bairro Bairro
 * @apiParam (Sucesso - 200) {String} resposta.cidade Cidade
 * @apiParam (Sucesso - 200) {String} resposta.uf UF
 * @apiParam (Sucesso - 200) {String} resposta.cnpj CNPJ (não obrigatório)
 * @apiParam (Sucesso - 200) {String} resposta.inscricao_estadual Inscrição Estadual
 * @apiParam (Sucesso - 200) {String} resposta.telefone_fixo Telefone fixo
 * @apiParam (Sucesso - 200) {String} resposta.celular Celular
 * @apiParam (Sucesso - 200) {String} resposta.email Email
 * @apiParam (Sucesso - 200) {String} resposta.barraca Já tem barraca?
 * @apiParam (Sucesso - 200) {Number} resposta.id_categoria Id categoria
 * @apiParam (Sucesso - 200) {Number} resposta.energia Energia elétrica
 * @apiParam (Sucesso - 200) {Number} resposta.estimativa_energia Estimativa de carga de energia
 * @apiParam (Sucesso - 200) {String} resposta.uso_energia Uso da energia
 * @apiParam (Sucesso - 200) {Boolean} resposta.pode_sol Pode ficar no sol?
 * @apiParam (Sucesso - 200) {String} resposta.sem_sombra Como resolver o sol
 * @apiParam (Sucesso - 200) {String} resposta.data_inicio Data início
 * @apiParam (Sucesso - 200) {String} resposta.nome Nome feirante
 * @apiParam (Sucesso - 200) {String} resposta.rg RG feirante
 * @apiParamExample  {json} Exemplo body
 *    {
 *      "nome_fantasia": "Barraca do Seu Jão",
 *      "razao_social": "Seu João LTDA",
 *      "endereco": "Rua Brasil, 111",
 *      "bairro": "Centro",
 *      "cidade": "Campo Mourão",
 *      "uf": "Paraná",
 *      "cnpj": "1111111111111" ou "",
 *      "inscricao_estadual": "123457" ou "",
 *      "telefone_fixo": "4435230000",
 *      "celular": "44999998888",
 *      "email": "jao@gmail.com",
 *      "barraca": "" ou "3x3" ou "5x5" ou "XxX",
 *      "id_categoria": 4,
 *      "energia": 0 ou 110 ou 220,
 *      "estimativa_energia": 500,
 *      "uso_energia": "Fogão",
 *      "pode_sol": true ou false,
 *      "sem_sombra": "" ou "Usar uma lona"
 *      "data_inicio": "31-12-2018",
 *      "nome": "João Amoedo",
 *      "rg": "111111111",
 *      "cpf": "11111111111"
 *    }
 *
 * @apiSuccess (Sucesso - 200) FeiranteAdicionado Feirante adicionado
 * @apiError (Erro - 400) DadosInvalidos Dados inválidos
 * @apiError (Erro - 401) NaoAutorizado Não autorizado
 */
router.put('/:cpf', (req, res) => {
  res.send();
});

/**
 * @api {delete} /feirante Apaga (desativa) feirante
 * @apiName DeleteFeirante
 * @apiGroup Feirante
 *
 * @apiHeader {String} Authorization JWT admin/supervisor
 * @apiHeaderExample {String} Headers
 *    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
 *    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
 *    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *
 * @apiParam  {String} cpf CPF feirante
 * @apiParamExample  {Number} Exemplo parâmetro query
 *    /feirante/11111111111
 *
 * @apiSuccess (Sucesso - 200) FeiranteDesativado Feirante desativado
 * @apiError (Erro - 400) CpfInvalido CPF inválido
 * @apiError (Erro - 401) NaoAutorizado Não autorizado
 */
router.delete('/:cpf', (req, res) => {
  res.send();
});

module.exports = router;
