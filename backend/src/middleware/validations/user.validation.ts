/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
import { Request, Response, NextFunction } from 'express';

import Joi from 'joi';

const loginSchema = Joi.object({
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

const cadasterSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': 'O \'email\' tem que ser uma string\'',
      'string.email': 'O \'email\' tem que ser valido\'',
      'any.required': 'O \'email\' tem que existir\'',
    }),
  cpf: Joi.string().regex(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/).required()
    .messages({
      'string.pattern.base': 'O \'cpf\' tem que ser valido\'',
      'any.required': 'O \'cpf\' tem que existir\'',
    }),
});

const cadasterValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { username, password, cpf, email } = req.body;
  const reponseLogin = loginSchema.validate({ username, password });
  const responseCadaster = cadasterSchema.validate({ cpf, email });

  if (reponseLogin.error) throw reponseLogin.error;
  if (responseCadaster.error) throw responseCadaster.error;

  next();
};

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { error } = loginSchema.validate({ username, password });

  if (error) throw error;
  next();
};

export { cadasterValidation, loginValidation };
