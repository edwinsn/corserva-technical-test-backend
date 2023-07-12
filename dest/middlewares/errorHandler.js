"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.expose === true) {
        res.status(err.status || 500).send(err);
    }
    else {
        res.status(500).send(http_errors_1.default.InternalServerError());
    }
};
exports.default = errorHandler;
