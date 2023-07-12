"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    databases: {
        rest: {
            database: "rest",
            username: "postgres",
            password: "postgres",
            host: "localhost",
            port: 5432,
            dialect: "postgres",
        },
    },
};
exports.default = config;
