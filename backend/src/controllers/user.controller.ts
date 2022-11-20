import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { IService } from '../interfaces/IService';
// import User from '../database/models/users';

export default class UserController {
  constructor(private userService: IService) { }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;

      const token = await this.userService.create(username, password);
      res.status(StatusCodes.CREATED).json(token);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await this.userService.login(username, password);
      res.status(StatusCodes.OK).json({ user: user.username, id: user.id });
    } catch (err) {
      next(err);
    }
  }

  async getBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user } = req.body;
      const balance = await this.userService.getBalance(user);
      res.status(StatusCodes.OK).json({ balance });
    } catch (err) {
      next(err);
    }
  }
}
