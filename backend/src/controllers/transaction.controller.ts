import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { IServiceTransactions } from '../interfaces/IService';

export default class TransactionController {
  constructor(private transactionsService: IServiceTransactions) { }

  async cashOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cashOutValue } = req.body;

      await this.transactionsService.cashOut(Number(cashOutValue));
      res.status(StatusCodes.OK).json({ message: 'Transaction Sucess' });
    } catch (err) {
      next(err);
    }
  }
}
