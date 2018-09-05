const request = require('supertest');
const app = require('../app');

describe('Exemplo de teste unitário', () => {
  test('Deve responder a requisição', () => request(app)
    .get('/exemplo')
    .expect(200));
});
