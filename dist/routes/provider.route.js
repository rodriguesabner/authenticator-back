"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provider_controller_1 = __importDefault(require("../controllers/provider.controller"));
class ProviderRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.managerController = new provider_controller_1.default();
        this.routes();
    }
    routes() {
        this.router.get('/', this.managerController.getAll.bind(this.managerController));
        this.router.delete('/', this.managerController.delete.bind(this.managerController));
    }
}
exports.default = ProviderRoute;
