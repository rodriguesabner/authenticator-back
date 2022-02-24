import supertest from "supertest";
import server from "../../src/server"

let request = supertest(server);

describe('Teste Providers', function () {
    it('Deve listar os providers', async function () {
        const response = await request
            .get('/provider');

        expect(response.status).toBe(200);
        expect(response.body.token.length).toBe(6);
    });

    it('Deve gerar uma url OTPAuth', async function () {
        const response = await request
            .post('/otp/generate')
            .send({
                label: "rodriguesabner",
                secret: "PHVCHNOLSHYCDGER",
                issuer: "GitHub"
            });

        expect(response.status).toBe(200);
        expect(response.body.token.length).toBe(6);
    });

    it('Deve validar uma senha OTP', async function () {
        const response = await request
            .post('/otp/validate')
            .send({
                label: "rodriguesabner",
                token: "974352",
                secret: "PHVCHNOLSHYCDGER",
                issuer: "GitHub"
            });


        expect(response.status).toBe(200);
        expect(response.body.isValid).toBe(true);
    });
});