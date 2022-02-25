"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = __importDefault(require("../controllers/otp.controller"));
class OtpRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.otpController = new otp_controller_1.default();
        this.routes();
    }
    routes() {
        this.router.post('/parse', this.otpController.parse.bind(this.otpController));
        this.router.post('/validate', this.otpController.validate.bind(this.otpController));
        this.router.post('/create', this.otpController.createTotp.bind(this.otpController));
        this.router.post('/generate-code', this.otpController.generateTotp.bind(this.otpController));
    }
}
exports.default = OtpRoute;
