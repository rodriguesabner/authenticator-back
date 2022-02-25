import * as OTPAuth from "otpauth";
import ProviderRepository from "../repository/provider.repository";
import BaseService from "../common/BaseService";

class OtpService extends BaseService {
    private providerRepository: ProviderRepository;

    constructor() {
        super();
        this.providerRepository = new ProviderRepository();
    }

    async generateCode({issuer, label}: any) {
        const ret = await this.providerRepository.findOne(issuer, label);

        const provider = ret._doc;
        delete provider._id;
        delete provider.icon;

        const totp = new OTPAuth.TOTP(provider);
        const token = totp.generate();

        return token;
    }

    async create({issuer, label, secret}: any) {
        const totp = new OTPAuth.TOTP({
            issuer: issuer,
            label: label,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: secret
        });

        const token = totp.generate();
        return {token};
    }

    async validate({issuer, label, token, secret}: any) {
        const totp = new OTPAuth.TOTP({
            issuer: issuer,
            label: label,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: secret
        });

        const isValid = totp.validate({
            token: token,
            window: 1,
        });

        return {isValid: isValid != null && isValid === 0};
    }

    async parse(otpauth: string) {
        const otp = this.extractOTPURI(otpauth);
        const parsedTotp = OTPAuth.URI.parse(otp.uri);

        const token = parsedTotp.generate();

        const provider = await this.providerRepository.save({
            emitter: otp.emitter,
            issuer: otp.issuer,
            label: parsedTotp.label,
            parsedTotp,
            algorithm: parsedTotp.algorithm,
            digits: parsedTotp.digits,
        });

        return {
            provider: parsedTotp.issuer,
            user: parsedTotp.label,
            token,
            icon: provider.icon
        };
    }

}

export default OtpService;