const request = require('supertest');
const app = require('../app');

describe('Testando rota /feirante', () => {
  test('Deve responder a requisição GET', () => request(app)
    .get('/feirante')
    .expect(200));

  test('Deve responder a requisição GET com parâmetro', () => request(app)
    .get('/feirante/5')
    .expect(200));

  test('Deve responder a requisição POST', () => request(app)
    .post('/feirante')
    .expect(200));

  test('Deve responder a requisição PUT', () => request(app)
    .put('/feirante/5')
    .expect(200));

  test('Não deve responder a requisição PUT sem parâmetro', () => request(app)
    .put('/feirante')
    .expect(404));

  test('Deve responder a requisição DELETE', () => request(app)
    .delete('/feirante/5')
    .expect(200));
});
