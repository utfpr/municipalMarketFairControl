var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../app'); 

chai.use(chaiHttp);


describe('Teste route supervisor', () => {

    it('Teste GET supervisor', () => {
        chai.request(app).get('/supervisor').end((err, res) => {
            chai.expect(res).to.have.status(200);
        });
    });

    it('Teste POST supervisor', () => {
        var send = {
            cpf: "07564266982",
            senha: 'senha123',
        };
        chai.request(app).post(send).then( (res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(req).to.be.json;
        });
    });

});