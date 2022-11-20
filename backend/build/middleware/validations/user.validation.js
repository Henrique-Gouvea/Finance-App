"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
const uservalidation = (req, _res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required()
            .messages({
            'string.base': 'O \'username\' tem que ser uma string\'',
            'string.min': 'O \'username\' tem que ter no minimo 3 letras\'',
            'any.required': 'O \'username\' tem que existir\'',
        }),
        password: Joi.string().min(8).regex(/((?=.*\d)(?=.*[A-Z])).*$/).required()
            .messages({
            'string.base': 'O \'password\' tem que ser uma string\'',
            'string.min': 'O \'password\' tem que ter no minimo 8 letras\'',
            'string.pattern.base': 'O \'password\' tem que conter ao menos 1 maiuscula e 1 numero\'',
            'any.required': 'O \'password\' tem que existir\'',
        }),
    });
    const { username, password } = req.body;
    const { error } = schema.validate({ username, password });
    if (error)
        throw error;
    next();
};
exports.default = uservalidation;