"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.cadasterValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
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
const cadasterSchema = joi_1.default.object({
    email: joi_1.default.string().email().required()
        .messages({
        'string.base': 'O \'email\' tem que ser uma string\'',
        'string.email': 'O \'email\' tem que ser valido\'',
        'any.required': 'O \'email\' tem que existir\'',
    }),
    cpf: joi_1.default.string().required()
        .messages({
        'any.required': 'O \'cpf\' tem que existir\'',
    }),
});
const cadasterValidation = (req, _res, next) => {
    const { username, password, cpf, email } = req.body;
    const reponseLogin = loginSchema.validate({ username, password });
    const responseCadaster = cadasterSchema.validate({ cpf, email });
    if (reponseLogin.error)
        throw reponseLogin.error;
    if (responseCadaster.error)
        throw responseCadaster.error;
    next();
};
exports.cadasterValidation = cadasterValidation;
const loginValidation = (req, _res, next) => {
    const { username, password } = req.body;
    const { error } = loginSchema.validate({ username, password });
    if (error)
        throw error;
    next();
};
exports.loginValidation = loginValidation;
