"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.middlewares();
        this.app.use(express_1.default.static(`${__dirname}/files`));
    }
    middlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json({ limit: '25mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)({ origin: '*' }));
    }
    routes() {
        this.app.use('', new routes_1.default().app);
    }
}
exports.default = new Server().app;
