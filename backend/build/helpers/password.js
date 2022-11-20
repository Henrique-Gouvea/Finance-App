"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const passwordService = {
    encryptPassword: (password) => {
        const salt = bcrypt_1.default.genSaltSync(5);
        const encryptedPassword = bcrypt_1.default.hashSync(password, salt);
        return encryptedPassword;
    },
    verifyPassword: (password, passwordDB) => {
        const verifyPassword = bcrypt_1.default.compare(password, passwordDB);
        return verifyPassword;
    },
};
exports.default = passwordService;
