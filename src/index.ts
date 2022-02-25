// @ts-nocheck
import { config } from './config';
import { createServer } from 'http';
import Server from './server';
import MongoConnector from './connectors/mongo.connector';

const http = createServer(Server);

const mongoConnector = new MongoConnector();
mongoConnector.connect();

const server = http.listen(config.web.port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(
    'App %s %s listening at http://%s:%s',
    config.name,
    config.version,
    host,
    port,
  );
});

export {
  server,
  mongoConnector,
};
