import ProviderRepository from "../repository/provider.repository";
import mongoose, {Mongoose} from "mongoose";

class ProviderService {
    private providerRepository: ProviderRepository;
    private mongoose: Mongoose;

    constructor() {
        this.providerRepository = new ProviderRepository();
        this.mongoose = mongoose;
    }

    async getAll() {
        const providers = await this.providerRepository.getAll();
        return providers;
    }

    async delete(issuer: string, label: string) {
        return this.providerRepository.delete(issuer, label);
    }
}

export default ProviderService;