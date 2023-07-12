"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    id: joi_1.default.number().integer().min(1),
    product: joi_1.default.string().required(),
    quantity: joi_1.default.number().integer().min(1).required(),
    price: joi_1.default.number().precision(2).min(0).required(),
    saleOrderId: joi_1.default.number().integer().min(1).required(),
});
exports.default = exports.schema;
