"use strict";
require("dotenv/config");
const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'FINANCE_APP',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DIALECT,
    logging: false,
};
module.exports = config;
