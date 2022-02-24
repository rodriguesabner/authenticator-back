class BaseService {
    private OTPURI_REGEX: RegExp;

    constructor() {
        this.OTPURI_REGEX =
            /^otpauth:\/\/([ht]otp)\/(.+)\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;
    }

    extractOTPURI(uri: string): string  {
        const match = this.OTPURI_REGEX.exec(uri);
        if (!match) {
            throw new Error('Invalid OTP URI');
        }

        const paramsStart = match[2].split(':').reduce((acc, param) => {
            // @ts-ignore
            acc.push(param);
            return acc;
        }, []);

        const paramsFinal = match[3].split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            // @ts-ignore
            acc[key] = value;
            return acc;
        }, {});

        let [emitter, label]: any = paramsStart;
        const { issuer, secret }: any  = paramsFinal;

        if(emitter !== issuer){
            emitter = issuer;
        }

        const otpuri = `otpauth://totp/${emitter}:${label}?secret=${secret}&issuer=${issuer}`;
        return otpuri;
    }
}

export default BaseService;