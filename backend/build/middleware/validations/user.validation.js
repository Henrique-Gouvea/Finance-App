"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const uservalidation = (req, _res, next) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(3).required()
            .messages({
            'string.base': 'O \'username\' tem que ser uma string\'',
            'string.min': 'O \'username\' tem que ter no minimo 3 letras\'',
            'any.required': 'O \'username\' tem que existir\'',
        }),
        password: joi_1.default.string().min(8).regex(/((?=.*\d)(?=.*[A-Z])).*$/).required()
            .messages({
            'string.base': 'O \'password\' tem que ser uma string\'',
            'string.min': 'O \'password\' tem que ter no minimo 8 letras\'',
            'string.pattern.base': 'O \'password\' tem que conter ao menos 1 maiuscula e 1 numero\'',
            'any.required': 'O \'password\' tem que existir\'',
        }),
    });
    const { username, password } = req.body;
    const { error } = schema.validate({ username, password });
    console.log(error);
    if (error)
        throw error;
    next();
};
exports.default = uservalidation;
