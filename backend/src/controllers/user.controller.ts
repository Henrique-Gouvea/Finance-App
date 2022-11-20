import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import User from '../database/models/users';

export default class UserController {
  constructor(private userService: IService<User>) { }

  async create(req: Request, res: Response): Promise<void> {
    const user = await this.userService.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
  }
}
