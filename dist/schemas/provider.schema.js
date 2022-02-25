"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const providerSchema = new mongoose_1.default.Schema({
    issuer: String,
    label: String,
    algorithm: String,
    digits: Number,
    period: Number,
    secret: String,
    icon: Object,
});
const Provider = mongoose_1.default.model('Provider', providerSchema);
exports.default = Provider;
