import Transaction from '../database/models/transactions';
import { ITransaction } from './values/ITransaction';

export interface IServiceUser {
  create(username: string, password: string, cpf: number, email: string): Promise<string>
  login(username: string, password: string): Promise<string>
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
  getAllTransactions(user: string): Promise<Transaction[]>
  filterTransaction(
    cashOut: boolean,
    cashIn: boolean,
    startDate: string,
    endDate: string,
    user: string): Promise<Transaction[]>
}
