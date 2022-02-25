class BaseService {
  private OTPURI_REGEX: RegExp;

  constructor() {
    this.OTPURI_REGEX =
            /^otpauth:\/\/([ht]otp)\/(.+)\?([A-Z0-9.~_-]+=[^?&]*(?:&[A-Z0-9.~_-]+=[^?&]*)*)$/i;
  }

  extractOTPURI(uri: string): { uri: string; label: string; secret: string; emitter: string; issuer: string }  {
    const match = this.OTPURI_REGEX.exec(uri);
    if (!match) {
      throw new Error('Invalid OTP URI');
    }

    const uriLabel = match[2].split(/:(.+)/, 2).map(decodeURIComponent);

    const paramsFinal = match[3].split('&').reduce((acc, param) => {
      const [key, value] = param.split('=');
      // @ts-ignore
      acc[key] = value;
      return acc; 
    }, {});

    const [emitter, label]: any = uriLabel;
    const { issuer, secret }: any  = paramsFinal;

    let newEmitter = emitter;
    if (emitter !== issuer){
      newEmitter = issuer;
    }

    const otpuri = `otpauth://totp/${newEmitter}:${label}?secret=${secret}&issuer=${issuer}`;
    return { uri: otpuri, emitter, label, secret, issuer };
  }
}

export default BaseService;