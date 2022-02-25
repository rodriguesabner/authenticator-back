"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const OTPAuth = __importStar(require("otpauth"));
const provider_repository_1 = __importDefault(require("../repository/provider.repository"));
const BaseService_1 = __importDefault(require("../common/BaseService"));
class OtpService extends BaseService_1.default {
    constructor() {
        super();
        this.providerRepository = new provider_repository_1.default();
    }
    create({ issuer, label, secret }) {
        return __awaiter(this, void 0, void 0, function* () {
            const totp = new OTPAuth.TOTP({
                issuer: issuer,
                label: label,
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: secret,
            });
            const token = totp.generate();
            return { token };
        });
    }
    generateCode({ issuer, label }) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.providerRepository.findOne(issuer, label);
            delete provider._id;
            delete provider.icon;
            const totp = new OTPAuth.TOTP(provider);
            const token = totp.generate();
            return token;
        });
    }
    validate(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const totp = new OTPAuth.TOTP({
                issuer: props.issuer,
                label: props.label,
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: props.secret,
            });
            const isValid = totp.validate({
                token: props.token,
                window: 1,
            });
            return { isValid: isValid != null && isValid === 0 };
        });
    }
    parseURLToCode(otpauth) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.extractOTPURI(otpauth);
            const parsedTotp = OTPAuth.URI.parse(otp.uri);
            const token = parsedTotp.generate();
            const secret = parsedTotp.secret.base32;
            const provider = yield this.providerRepository.save({
                emitter: otp.emitter,
                issuer: otp.issuer,
                label: parsedTotp.label,
                secret,
                // @ts-ignore
                period: parsedTotp.period,
                algorithm: parsedTotp.algorithm,
                digits: parsedTotp.digits,
            });
            return {
                issuer: parsedTotp.issuer,
                label: parsedTotp.label,
                token,
                icon: provider.icon,
            };
        });
    }
}
exports.default = OtpService;
