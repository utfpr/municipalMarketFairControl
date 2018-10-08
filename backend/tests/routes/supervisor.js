var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../app'); 

chai.use(chaiHttp);


describe('Teste route supervisor', () => {

    it('Teste GET supervisor/cadastro', () => {
        chai.request(app).get('/supervisor/cadastro').end((err, res) => {
            chai.expect(res).to.have.status(200);
        });
    });

    it('Teste POST supervisor/cadastro', () => {
        var send = {
            cpf: "07564266982",
            senha: 'senha123',
        };
        chai.request(app).post(send).then( (res) => {
            chai.expect(res).to.have.status(200);
        });
        chai.request(app).post(send).then( (req, res) => {
            chai.expect(req).to.be.json;
        });
    });

});