"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    id: joi_1.default.number().integer().min(1),
    customer: joi_1.default.string().when("id", {
        is: joi_1.default.exist(),
        then: joi_1.default.optional(),
        otherwise: joi_1.default.required(),
    }),
    deliveryAddress: joi_1.default.string().when("id", {
        is: joi_1.default.exist(),
        then: joi_1.default.optional(),
        otherwise: joi_1.default.required(),
    }),
    paymentMethod: joi_1.default.string()
        .valid("Cash", "Credit Card", "Debit Card")
        .when("id", {
        is: joi_1.default.exist(),
        then: joi_1.default.optional(),
        otherwise: joi_1.default.required(),
    }),
});
exports.default = schema;
