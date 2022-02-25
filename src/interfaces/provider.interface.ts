interface ProviderInterfaceSaveProps {
  emitter: string;
  issuer: string;
  label: string;
  algorithm: string;
  digits: number;
  period: number;
  secret: string;
}

interface ProviderIsValidProps {
  issuer: string;
  label: string;
  secret: string;
  token: string;
}

interface ProviderIconProps {
  name: string;
  group: string;
}

interface ProviderFindOneResponse {
  _id?: string;
  issuer: string;
  label: string;
  algorithm: string;
  digits: number;
  secret: string;
  icon?: ProviderIconProps;
}

interface ProviderParseResponse {
  issuer: string;
  label: string;
  token: string;
  icon: object;
}

export {
  ProviderInterfaceSaveProps,
  ProviderIsValidProps,
  ProviderParseResponse,
  ProviderFindOneResponse,
};