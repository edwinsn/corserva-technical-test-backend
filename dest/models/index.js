"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
dotenv_1.default.config();
const basename = path_1.default.basename(__filename);
let db = {};
const databases = Object.keys(config_1.default.databases);
for (let i = 0; i < databases.length; i++) {
    let database = databases[i];
    let dbPath = config_1.default.databases[database];
    db[database] = new sequelize_1.Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
}
/**Add the Database Models**/
fs_1.default.readdirSync(__dirname + "/rest")
    .filter((file) => {
    return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
})
    .forEach((file) => {
    var model = db.rest.import(path_1.default.join(__dirname + "/rest", file));
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.rest.sync({ alter: true });
exports.default = db;
