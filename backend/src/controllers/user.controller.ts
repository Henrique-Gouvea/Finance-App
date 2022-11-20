import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const usersService = require('../services/usersService');

const usersController = {

  create: async (req: Request, res: Response) => {
    const user = await usersService.create(req.body);

    res.status(StatusCodes.CREATED).json(user);
  },
};

module.exports = usersController;
