"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
// @ts-ignore
const package_json_1 = require("../../package.json");
const ENV = process.env.NODE_ENV || 'development';
const config = {
    [ENV]: true,
    env: ENV,
    name: 'authenticator-server',
    version: package_json_1.version,
    secretKey: process.env.SECRET_KEY || 'MY_SECRET_KEY',
    web: {
        port: process.env.PORT || 3040,
        database: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
    },
};
exports.config = config;
