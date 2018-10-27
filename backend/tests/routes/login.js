/* eslint-disable */

var chai = require('chai');
var chai_http = require('chai-http');
var expect = chai.expect;

chai.use(chai_http);

const app = require('../../app');

describe("Testando Rota de Login", () => {
    it("Teste get -> /login", () => {

        chai.request(app).get('/login').end( (err, res) => {
            chai.expect(res).to.have.status(200);
        });

    });

    it("Teste post -> /login", () => {
        var send = {
            cpf: "12345678909",
            senha: '12345'
        };
        chai.request(app).post(send).then( (res) => {
            chai.expect(res).to.have.status(200);
        });
        chai.request(app).post(send).then( (req, res) => {
            chai.expect(req).to.be.json;
        });

    });

});
