import User from '../database/models/users';

export interface IService {
  create(username: string, password: string): Promise<User>
  login(username: string, password: string): Promise<User>
}
