"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_service_1 = __importDefault(require("../services/otp.service"));
class OtpController {
    constructor() {
        this.otpService = new otp_service_1.default();
    }
    generateTotp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { issuer, label } = req.body;
            const data = {
                issuer: issuer,
                label: label,
            };
            const ret = yield this.otpService.generateCode(data);
            return res.status(200).json(ret);
        });
    }
    createTotp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { issuer, label, secret } = req.body;
            const data = {
                issuer: issuer,
                label: label,
                secret: secret,
            };
            const ret = yield this.otpService.create(data);
            return res.status(200).json(ret);
        });
    }
    validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { issuer, label, token, secret } = req.body;
            const data = { issuer, label, token, secret };
            const ret = yield this.otpService.validate(data);
            return res.status(200).json(ret);
        });
    }
    parse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uri } = req.body;
            const ret = yield this.otpService.parseURLToCode(uri);
            return res.status(200).json(ret);
        });
    }
}
exports.default = OtpController;
