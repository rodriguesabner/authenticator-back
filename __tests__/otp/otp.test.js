import supertest from "supertest";
import server from "../../src/server"

jest.setTimeout(30000);
let request = supertest(server);

describe('Teste OTP', function () {
    it('Deve gerar um OTP', async function () {
        const response = await request
            .post('/otp/generate-code')
            .send({
                issuer: "Heroku",
                label: "Abner Rodrigues"
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.otp).toBeDefined();
    });

    it('Deve gerar uma senha OTP', async function () {
        const response = await request
            .get('/otp/parse?otpuri=otpauth://totp/GitHub:rodriguesabner?secret=PHVCHNOLSHYCDGER&issuer=GitHub');

        expect(response.status).toBe(200);
        expect(response.body.token.length).toBe(6);
    });

    it('Deve gerar uma url OTPAuth', async function () {
        const response = await request
            .post('/otp/create')
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