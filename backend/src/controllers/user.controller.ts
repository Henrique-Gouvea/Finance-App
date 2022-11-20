import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
// import User from '../database/models/users';

export default class UserController {
  constructor(private userService: IService) { }

  async create(req: Request, res: Response): Promise<void> {
    console.log('teste');
    const { username, password } = req.body;
    console.log(username);

    const user = await this.userService.create(username, password);
    res.status(StatusCodes.CREATED).json(user);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      console.log('teste');
      const { username, password } = req.body;
      const user = await this.userService.login(username, password);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}
