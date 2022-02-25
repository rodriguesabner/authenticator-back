import ProviderSchema from '../schemas/provider.schema';
import BaseMapper from '../common/BaseMapper';
import { ProviderFindOneResponse, ProviderInterfaceSaveProps } from '../interfaces/provider.interface';

class ProviderRepository extends BaseMapper {
  async find(): Promise<ProviderFindOneResponse[]> {
    return ProviderSchema.find();
  }

  async findOne(issuer: string, label: string): Promise<ProviderFindOneResponse> {
    const ret = await ProviderSchema.findOne({ issuer: issuer, label: label });
    return ret.toObject();
  }

  async save(props: ProviderInterfaceSaveProps) {
    const providerExists = await ProviderSchema.findOne({ issuer: props.issuer, label: props.label });

    const parsedIssuer = `${props.issuer} - ${props.emitter}`;

    const schema = {
      issuer: parsedIssuer,
      label: props.label,
      algorithm: props.algorithm,
      digits: props.digits,
      period: props.period,
      secret: props.secret,
      icon: this.extractLogo(props.issuer),
    };

    const provider = new ProviderSchema(schema);

    if (providerExists) {
      await provider.updateOne({ issuer: props.issuer, label: props.label }, schema);
    } else {
      await provider.save();
    }

    return provider;
  }

  async delete(issuer: string, label: string) {
    return ProviderSchema.deleteOne({ issuer: issuer, label: label });
  }
}

export default ProviderRepository;