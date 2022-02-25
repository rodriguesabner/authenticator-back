import 'dotenv/config';
// @ts-ignore
import { version } from '../../package.json';

const ENV = process.env.NODE_ENV || 'development';

const config = { 
  [ENV]: true,
  env: ENV,
  name: 'authenticator-server',
  secretKey: process.env.SECRET_KEY || 'MY_SECRET_KEY',
  version,
  web: {
    port: process.env.PORT || 3040,
    database: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
  },
};

export { config };
