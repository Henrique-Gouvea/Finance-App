import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { IServiceTransactions } from '../interfaces/IService';

export default class TransactionController {
  constructor(private transactionsService: IServiceTransactions) { }

  async cashOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, cashOutValue, user } = req.body;

      const valuesTransaction = await this.transactionsService
        .validateTrasaction(username, Number(cashOutValue), user);
      await this.transactionsService.transaction(valuesTransaction);
      console.log(valuesTransaction);

      res.status(StatusCodes.OK).json({ message: 'Transaction Sucess' });
    } catch (err) {
      next(err);
    }
  }
}
