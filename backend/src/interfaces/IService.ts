import User from '../database/models/users';

export interface IService {
  create(username: string, password: string): Promise<string>
  login(username: string, password: string): Promise<User>
  getBalance(user: string): Promise<number>
}
