const exemploController = require('./exemplo');

describe('Exemplo de teste unitário', () => {
  test('Deve concatenar strings', () => {
    expect(exemploController.signin('a', 'b')).toBe('ab');
    expect(exemploController.signin('a@a.com', 'b')).toBe('a@a.comb');
  });
});
