import User from '../database/models/users';

export interface IServiceUser {
  create(username: string, password: string): Promise<string>
  login(username: string, password: string): Promise<User>
  getBalance(user: string): Promise<number>
}

export interface IServiceTransactions {
  cashOut(cashOutValue: number): Promise<string>
}
