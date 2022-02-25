import { Request, Response } from 'express';
import OtpService from '../services/otp.service';

class OtpController {
  private otpService: OtpService;

  constructor() {
    this.otpService = new OtpService();
  }

  async generateTotp(req: Request, res: Response) {
    const { issuer, label } = req.body;
    const data = {
      issuer: issuer,
      label: label,
    };
    const ret = await this.otpService.generateCode(data);
    return res.status(200).json(ret);
  }

  async createTotp(req: Request, res: Response) {
    const { issuer, label, secret } = req.body;
    const data = {
      issuer: issuer,
      label: label,
      secret: secret,
    };
    const ret = await this.otpService.create(data);
    return res.status(200).json(ret);
  }

  async validate(req: Request, res: Response) {
    const { issuer, label, token, secret } = req.body;

    const data = { issuer, label, token, secret };

    const ret = await this.otpService.validate(data);
    return res.status(200).json(ret);
  }

  async parse(req: Request, res: Response) {
    const { uri } = req.body;

    const ret = await this.otpService.parse(uri);
    return res.status(200).json(ret);
  }

}

export default OtpController;