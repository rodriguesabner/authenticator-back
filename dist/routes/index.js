"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otp_route_1 = __importDefault(require("./otp.route"));
const provider_route_1 = __importDefault(require("./provider.route"));
class Routes {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
    }
    routes() {
        this.app.use('/otp', new otp_route_1.default().router);
        this.app.use('/provider', new provider_route_1.default().router);
    }
}
exports.default = Routes;
