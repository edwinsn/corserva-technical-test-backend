import { Dialect } from 'sequelize';

interface Database {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: Dialect;
}

interface Databases {
  [key: string]: Database;
  rest: Database;
}

interface Config {
  databases: Databases;
}

const config: Config = {
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

export default config;
