var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../app'); 

chai.use(chaiHttp);

describe('Teste routes celula', () => {

    it('Teste celula/list', () => {
        chai.request(app).get('/celula/list').end((err, res) => {
            chai.expect(res).to.have.status(200);
        });
    });

    it('Teste celula/list/info', () => {
        chai.request(app).get('/celula/list/info').end((err, res) => {
            chai.expect(res).to.have.status(200);
        });
    });

    it('Teste /setFeirante', () => {
        var send = {
            id_celula: "1",
            cpf_feirante: '07564266982',
        };
        chai.request(app).post(send).then( (res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(req).to.be.json;
        });
    });

});