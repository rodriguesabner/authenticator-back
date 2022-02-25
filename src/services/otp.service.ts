import * as OTPAuth from 'otpauth';
import ProviderRepository from '../repository/provider.repository';
import BaseService from '../common/BaseService';
import { ProviderIsValidProps, ProviderParseResponse } from '../interfaces/provider.interface';

class OtpService extends BaseService {
  private providerRepository: ProviderRepository;

  constructor() {
    super();
    this.providerRepository = new ProviderRepository();
  }

  async generateCode({ issuer, label }: any) {
    const provider = await this.providerRepository.findOne(issuer, label);

    delete provider._id;
    delete provider.icon;

    const totp = new OTPAuth.TOTP(provider);
    const token = totp.generate();

    return token;
  }

  async create({ issuer, label, secret }: any) {
    const totp = new OTPAuth.TOTP({
      issuer: issuer,
      label: label,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: secret,
    });

    const token = totp.generate();
    return { token };
  }

  async validate(props: ProviderIsValidProps): Promise<{ isValid: boolean }> {
    const totp = new OTPAuth.TOTP({
      issuer: props.issuer,
      label: props.label,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: props.secret,
    });

    const isValid = totp.validate({
      token: props.token,
      window: 1,
    });

    return { isValid: isValid != null && isValid === 0 };
  }

  async parse(otpauth: string): Promise<ProviderParseResponse> {
    const otp = this.extractOTPURI(otpauth);
    const parsedTotp = OTPAuth.URI.parse(otp.uri);

    const token = parsedTotp.generate();
    const secret = parsedTotp.secret.base32;
 
    const provider = await this.providerRepository.save({
      emitter: otp.emitter,
      issuer: otp.issuer,
      label: parsedTotp.label,
      secret,
      // @ts-ignore
      period: parsedTotp.period,
      algorithm: parsedTotp.algorithm,
      digits: parsedTotp.digits,
    });

    return {
      issuer: parsedTotp.issuer,
      label: parsedTotp.label,
      token,
      icon: provider.icon,
    };
  }

}

export default OtpService;