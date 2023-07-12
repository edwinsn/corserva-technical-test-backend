"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors("*"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, parameterLimit: 5000, limit: "50mb" }));
app.use("/", routes_1.default);
app.use((_, res) => {
    res.status(404).json({ message: "Not Found" });
});
// If we have any error, we will call this middleware
app.use(errorHandler_1.default);
app.listen(4000, () => console.log("Running app"));
exports.default = app;
