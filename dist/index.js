"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnector = exports.server = void 0;
// @ts-nocheck
const config_1 = require("./config");
const http_1 = require("http");
const server_1 = __importDefault(require("./server"));
const mongo_connector_1 = __importDefault(require("./connectors/mongo.connector"));
const http = (0, http_1.createServer)(server_1.default);
const mongoConnector = new mongo_connector_1.default();
exports.mongoConnector = mongoConnector;
mongoConnector.connect();
const server = http.listen(config_1.config.web.port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App %s %s listening at http://%s:%s', config_1.config.name, config_1.config.version, host, port);
});
exports.server = server;
