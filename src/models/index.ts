import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../config/config";

dotenv.config();
const basename = path.basename(__filename);

interface Db {
  [key: string]: any;
}

let db: Db = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i];
  let dbPath = config.databases[database];

  db[database] = new Sequelize(
    dbPath.database,
    dbPath.username,
    dbPath.password,
    dbPath
  );
}

/**Add the Database Models**/
fs.readdirSync(__dirname + "/rest")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    var model = db.rest.import(path.join(__dirname + "/rest", file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.rest.sync({ alter: true });

export default db;
