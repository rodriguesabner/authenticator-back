import ProviderRepository from '../repository/provider.repository';
import mongoose, { Mongoose } from 'mongoose';

class ProviderService {
  private providerRepository: ProviderRepository;

  private mongoose: Mongoose;

  constructor() {
    this.providerRepository = new ProviderRepository();
    this.mongoose = mongoose;
  }

  async getAll(): Promise<any> {
    const providers = await this.providerRepository.find();
    return providers;
  }

  async delete(issuer: string, label: string): Promise<any> {
    return this.providerRepository.delete(issuer, label);
  }
}

export default ProviderService;