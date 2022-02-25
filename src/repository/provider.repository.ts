import ProviderSchema from "../schema/provider.schema";
import BaseMapper from "../common/BaseMapper";

class ProviderRepository extends BaseMapper {
    async findOne(issuer: string, label: string): Promise<any> {
        const ret = await ProviderSchema.findOne({issuer: issuer, label: label});
        return ret;
    }

    async getAll() {
        return await ProviderSchema.find();
    }

    async save({emitter, issuer, label, algorithm, digits, period, secret}: any) {
        const proverExists = await ProviderSchema.findOne({issuer: issuer, label: label});

        const schema = {
            issuer: `${issuer} - ${emitter}`,
            label: label,
            algorithm: algorithm,
            digits: digits,
            period: period,
            secret: secret,
            icon: this.extractLogo(issuer)
        }

        const provider = new ProviderSchema(schema);

        if (proverExists) {
            await provider.updateOne({issuer: issuer, label: label}, schema);
        } else {
            await provider.save();
        }
        return provider;
    }

    async delete(issuer: string, label: string) {
        return await ProviderSchema.deleteOne({issuer: issuer, label: label});
    }
}

export default ProviderRepository;