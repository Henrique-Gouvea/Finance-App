import User from '../database/models/users';
import { ITransaction } from './values/ITransaction';

export interface IServiceUser {
  create(username: string, password: string): Promise<string>
  login(username: string, password: string): Promise<User>
  getBalance(user: string): Promise<number>
}

export interface IServiceTransactions {
  validateTrasaction(
    usernameCashIn: string,
    cashOutValue: number,
    usernameCashOut: string): Promise<ITransaction>
  transaction({
    debitedAccountId,
    creditedAccountId,
    value,
    debitedBalanceUpdated,
    creditedBalanceUpdated,
  }: ITransaction): Promise<void>
}
