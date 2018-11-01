// var chai = require('chai');
// var chaiHttp = require('chai-http');
// const app = require('../../app'); 
// const faker = require('faker');
// const supervisorController = require('../../controllers/supervisor');
// const feiranteController = require('../../controllers/feirante');
// const categoriaController = require('../../controllers/categoria');
// const subCategoriaController = require('../../controllers/subcategoria');
// const loginController = require('../../controllers/login');
// const models = require('../../models');
// const { assert } = chai;

// chai.use(chaiHttp);

// describe('Rotas Subcategoria', () => {
//   let tokenSupervisor;
//   let feirante;
//   let tokenAdmin;
//   let tokenFeirante;
//   let subcategoria;
//   let categoria;
//   before(async () => {
//     const admin = await supervisorController.addSupervisor(
//       '89569380080',
//       faker.name.firstName(),
//       '1234',
//       true,
//     );

//     const supervisor = await supervisorController.addSupervisor(
//       '56919550040',
//       faker.name.firstName(),
//       '1234',
//       false,
//     );

//     categoria = await categoriaController.addCategoria('Alimento', false);
//     subcategoria = await categoria.createSubCategoria({ nome: 'Salgado' });
//     feirante = await feiranteController.addFeirante(
//       '58295846035',
//       '469964807',
//       faker.name.firstName(),
//       '',
//       '1234',
//       true,
//       faker.name.firstName(),
//       faker.name.firstName(),
//       4,
//       4,
//       {
//         logradouro: faker.address.streetAddress(),
//         bairro: faker.address.secondaryAddress(),
//         numero: 100,
//         CEP: '87.303-065',
//       },
//       110,
//       subcategoria.id,
//     );

//     tokenFeirante = (await loginController.login(feirante.cpf, '1234')).token;
//     tokenAdmin = (await loginController.login(admin.cpf, '1234')).token;
//     tokenSupervisor = (await loginController.login(supervisor.cpf, '1234')).token;

//   });

//   after(async () => {
//     await models.categoria.destroy({ where: {} });
//     await models.subcategoria.destroy({ where: {} });
//     await models.feirante.destroy({ where: {} });
//     await models.supervisor.destroy({ where: {} });
//   });

//   describe('POST /subcategoria', () => {
//     it('Supervisor pode adicionar subcategoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/subcategoria')
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Salgados',
//           categoria_id: `${categoria.id}`,
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');
//     });

//     it('Admin pode adicionar subcategoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/subcategoria')
//         .set('token', tokenAdmin)
//         .send({
//           nome: 'Salgados',
//           categoria_id: `${categoria.id}`,
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');
//     });

//     it('Feirante não pode adicionar subcategoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/subcategoria')
//         .set('token', tokenFeirante)
//         .send({
//           nome: 'Salgados',
//           categoria_id: `${categoria.id}`,
//         });
//       assert.strictEqual(res.statusCode, 401);
//     });

//     it('Atributos faltando', async () => {
//       const res = await chai
//         .request(app)
//         .post('/subcategoria')
//         .set('token', tokenSupervisor)
//         .send({
//           //nome: 'Salgados',
//           categoria_id: `${categoria.id}`,
//         });
//       assert.strictEqual(res.statusCode, 400);
//     });

//     it('Categoria nao existe', async () => {
//       const res = await chai
//         .request(app)
//         .post('/subcategoria')
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Salgados',
//           categoria_id: `5`,
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'categoria_nao_existente');
//     });
//   });

//   describe('GET /subcategoria/:id', () => {
//     it('ID nao existe', async () => {
//       const res = await chai
//         .request(app)
//         .get('/subcategoria/4')
//         .set('token', tokenSupervisor)
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     it('Retorna informações pelo ID', async () => {
//       const res = await chai
//         .request(app)
//         .get(`/subcategoria/${subcategoria.id}`)
//         .set('token', tokenSupervisor)
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.id, subcategoria.id);
//     });
//   });
  
//   describe('PUT /subcategoria/:id', () => {
//     it('Atributos faltando', async () => {
//       const res = await chai
//         .request(app)
//         .put(`/subcategoria/${subcategoria.id}`)
//         .set('token', tokenSupervisor)
//         .send({
//           //nome: 'Salgados',
//         });
//       assert.strictEqual(res.statusCode, 400);
//     });

//     it('ID não existe', async () => {
//       const res = await chai
//         .request(app)
//         .put('/subcategoria/1')
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Salgados',
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     it('Atualiza subcategoria', async () => {
//       let novoNome = faker.name.firstName();
//       let res = await chai
//         .request(app)
//         .put(`/subcategoria/${subcategoria.id}`)
//         .set('token', tokenSupervisor)
//         .send({
//           nome: novoNome,
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');

//       res = await chai
//         .request(app)
//         .get(`/subcategoria/${subcategoria.id}`)
//         .set('token', tokenSupervisor)
//         assert.strictEqual(res.statusCode, 200);
//         assert.strictEqual(res.body.nome, novoNome);
//     });
//   });

//   describe('DELETE /subcategoria/:id', () => {
//     it('ID não existe', async () => {
//       const res = await chai
//         .request(app)
//         .delete('/subcategoria/1')
//         .set('token', tokenSupervisor)
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     it('Deleta subcategoria', async () => {
//       let res = await chai
//         .request(app)
//         .delete(`/subcategoria/${subcategoria.id}`)
//         .set('token', tokenSupervisor)
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');

//       res = await chai
//         .request(app)
//         .get(`/subcategoria/${subcategoria.id}`)
//         .set('token', tokenSupervisor)
//         assert.strictEqual(res.statusCode, 200);
//         assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });
//   });
// });