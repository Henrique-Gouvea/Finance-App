import 'dotenv/config';
import { Dialect, Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'FINANCE_APP',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DIALECT as Dialect,
  logging: false,
};

export = config;
