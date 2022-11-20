"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
class tokenProvider {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
    }
    generateToken(email) {
        const token = (0, jsonwebtoken_1.sign)({ data: email }, this.jwtSecret, {
            expiresIn: '1d',
            algorithm: 'HS256',
        });
        return token;
    }
    checkToken(token) {
        try {
            console.log(`checktoken${token}`);
            const response = (0, jsonwebtoken_1.verify)(token, this.jwtSecret);
            console.log(response);
            if (!response) {
                const e = new Error('Token invalido');
                e.name = 'Unauthorized';
                throw e;
            }
            const { data } = response;
            return data;
        }
        catch (err) {
            const e = new Error('Token invalido');
            e.name = 'Unauthorized';
            throw e;
        }
    }
}
exports.default = tokenProvider;
