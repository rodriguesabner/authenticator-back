import { config } from './config';
import { createServer } from 'http';
import Server from './server';
import MongoConnector from './connectors/mongo.connector';

const http = createServer(Server);

const mongoConnector = new MongoConnector();
mongoConnector.connect();

const server = http.listen(config.web.port, () => {
  // @ts-ignore
  const host = server.address()?.address;
  // @ts-ignore
  const port = server.address()?.port;

  console.log(
    'App %s %s listening at http://%s:%s',
    host,
    port,
  );
});

export {
  server,
  mongoConnector,
};
