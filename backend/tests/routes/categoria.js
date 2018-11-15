// var chai = require('chai');
// var chaiHttp = require('chai-http');
// const app = require('../../app'); 
// const faker = require('faker');
// const supervisorController = require('../../controllers/supervisor');
// const feiranteController = require('../../controllers/feirante');
// const categoriaController = require('../../controllers/categoria');
// const loginController = require('../../controllers/login');
// const models = require('../../models');
// const { assert } = chai;

// chai.use(chaiHttp);

// describe('Rotas Categoria', () => {
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

//   describe('POST /categoria', () => {
//     it('Supervisor pode adicionar categoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/categoria')
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Alimentos',
//           need_cnpj: '1'
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');
//     });

//     it('Admin pode adicionar categoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/categoria')
//         .set('token', tokenAdmin)
//         .send({
//           nome: 'Artesanato',
//           need_cnpj: '0'
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');
//     });

//     it('Feirante não pode adicionar categoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/categoria')
//         .set('token', tokenFeirante)
//         .send({
//           nome: 'Artesanato',
//           need_cnpj: '0'
//         });
//       assert.strictEqual(res.statusCode, 401);
//     });

//     it('Sem token não pode adicionar categoria', async () => {
//       const res = await chai
//         .request(app)
//         .post('/categoria')
//         .set('token', 'aaaaa')
//         .send({
//           nome: 'Artesanato',
//           need_cnpj: '0'
//         });
//       assert.strictEqual(res.statusCode, 401);
//     });

//     it('Atributos faltando', async () => {
//       const res = await chai
//         .request(app)
//         .post('/categoria')
//         .set('token', tokenSupervisor)
//         .send({
//           //nome: '',
//           need_cnpj: '1'
//         });
//       assert.strictEqual(res.statusCode, 400);
//     });

//     it('Atributos incorretos', async () => {
//       const res = await chai
//         .request(app)
//         .post('/categoria')
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Alimentos',
//           need_cnpj: '4'
//         });
//       assert.strictEqual(res.statusCode, 400);
//     });
//   });

//   describe('GET /categoria', () => {
//     it('Supervisor pode listar categorias', async () => {
//       const res = await chai
//         .request(app)
//         .get('/categoria')
//         .set('token', tokenSupervisor);
//       assert.strictEqual(res.statusCode, 200);
//     });

//     it('Admin pode listar categorias', async () => {
//       const res = await chai
//         .request(app)
//         .get('/categoria')
//         .set('token', tokenAdmin);
//       assert.strictEqual(res.statusCode, 200);
//     });

//     it('Feirante não pode listar categorias', async () => {
//       const res = await chai
//         .request(app)
//         .get('/categoria')
//         .set('token', tokenFeirante);
//       assert.strictEqual(res.statusCode, 401);
//     });
//   });

//   describe('GET /categoria/:id', () => {
//     it('id não existe', async () => {
//       const res = await chai
//         .request(app)
//         .get('/categoria/3')
//         .set('token', tokenSupervisor);
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     it('Retorna categoria pelo ID', async () => {
//       const res = await chai
//         .request(app)
//         .get(`/categoria/${categoria.id}`)
//         .set('token', tokenSupervisor);
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.id, categoria.id);
//     });
//   });

//   describe('GET /categoria/:id/subcategorias', () => {
//     it('id não existe', async () => {
//       const res = await chai
//         .request(app)
//         .get('/categoria/3/subcategorias')
//         .set('token', tokenSupervisor);
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     it('Lista subcategorias com um ID existente', async () => {
//       const res = await chai
//         .request(app)
//         .get(`/categoria/${categoria.id}/subcategorias`)
//         .set('token', tokenSupervisor);
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.filter(e => e.id === subcategoria.id)[0].nome, subcategoria.nome);
//     });
//   });

//   describe('PUT /categoria/:id', () => {
//     it('Atributos faltando', async () => {
//       const res = await chai
//         .request(app)
//         .put(`/categoria/${categoria.id}`)
//         .set('token', tokenSupervisor)
//         .send({
//           //nome: '',
//           need_cnpj: '1'
//         });
//       assert.strictEqual(res.statusCode, 400);
//     });

//     it('Atributos incorretos', async () => {
//       const res = await chai
//         .request(app)
//         .put(`/categoria/${categoria.id}`)
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Alimentos',
//           need_cnpj: '4'
//         });
//       assert.strictEqual(res.statusCode, 400);
//     });

//     it('ID não existe', async () => {
//       const res = await chai
//         .request(app)
//         .put('/categoria/3')
//         .set('token', tokenSupervisor)
//         .send({
//           nome: 'Alimentos',
//           need_cnpj: '1'
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     let novoNome = faker.name.firstName();
//     it('Atualiza categoria', async () => {
//       let res = await chai
//         .request(app)
//         .put(`/categoria/${categoria.id}`)
//         .set('token', tokenSupervisor)
//         .send({
//           nome: novoNome,
//           need_cnpj: '0'
//         });
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');

//       res = await chai
//         .request(app)
//         .get(`/categoria/${categoria.id}`)
//         .set('token', tokenSupervisor);
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.nome, novoNome);
//     });
//   });


//   describe('DELETE /categoria/:id', () => {
//     it('ID não existe', async () => {
//       const res = await chai
//         .request(app)
//         .delete('/categoria/3')
//         .set('token', tokenSupervisor)
//         .send();
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'id_nao_existente');
//     });

//     it('Remove categoria', async () => {
//       const res = await chai
//         .request(app)
//         .delete(`/categoria/${categoria.id}`)
//         .set('token', tokenSupervisor)
//         .send();
//       assert.strictEqual(res.statusCode, 200);
//       assert.strictEqual(res.body.msg, 'ok');
//     });

//   });
// });