import { Request, Response } from 'express';
const Joi = require('joi');

const uservalidation = (req: Request, _res: Response) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required()
      .messages({
        'string.base': 'O \'username\' tem que ser uma string\'',
        'string.min': 'O \'username\' tem que ter no minimo 3 letras\'',
        'any.required': 'O \'username\' tem que existir\'',
      }),
    password: Joi.string().min(8).regex(/^(?=\S*[A-Z])(?=\S*[0-9])$/).required()
      .messages({
        'string.base': 'O \'password\' tem que ser uma string\'',
        'string.min': 'O \'password\' tem que ter no minimo 8 letras\'',
        'string.pattern.base': 'O \'password\' tem que conter ao menos 1 maiuscula e 1 numero\'',
        'any.required': 'O \'password\' tem que existir\'',
      }),
  });

  const { error, value } = schema.validate(req.body);

  if (error) throw error;

  return value;
};

export default uservalidation;
