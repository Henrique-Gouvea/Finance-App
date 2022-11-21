"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const bcrypt_1 = __importDefault(require("bcrypt"));
class cryptoProvider {
    constructor(teste = 'teste') {
        this.teste = teste;
    }
    encryptPassword(password) {
        const salt = bcrypt_1.default.genSaltSync(5);
        const encryptedPassword = bcrypt_1.default.hashSync(password, salt);
        return encryptedPassword;
    }
    verifyPassword(password, passwordHash) {
        const verifyPassword = bcrypt_1.default.compareSync(password, passwordHash);
        return verifyPassword;
    }
}
exports.default = cryptoProvider;
