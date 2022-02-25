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
const provider_schema_1 = __importDefault(require("../schemas/provider.schema"));
const BaseMapper_1 = __importDefault(require("../common/BaseMapper"));
class ProviderRepository extends BaseMapper_1.default {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return provider_schema_1.default.find();
        });
    }
    findOne(issuer, label) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = yield provider_schema_1.default.findOne({ issuer: issuer, label: label });
            return ret.toObject();
        });
    }
    save(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedIssuer = `${props.issuer} - ${props.emitter}`;
            const providerExists = yield provider_schema_1.default.findOne({ issuer: parsedIssuer, label: props.label });
            const schema = {
                issuer: parsedIssuer,
                label: props.label,
                algorithm: props.algorithm,
                digits: props.digits,
                period: props.period,
                secret: props.secret,
                icon: this.extractLogo(props.issuer),
            };
            const provider = new provider_schema_1.default(schema);
            if (providerExists) {
                yield provider.updateOne({ issuer: parsedIssuer, label: props.label }, schema);
            }
            else {
                yield provider.save();
            }
            return provider;
        });
    }
    delete(issuer, label) {
        return __awaiter(this, void 0, void 0, function* () {
            return provider_schema_1.default.deleteOne({ issuer: issuer, label: label });
        });
    }
}
exports.default = ProviderRepository;
