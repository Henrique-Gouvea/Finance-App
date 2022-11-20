import User from '../database/models/users';
import Account from '../database/models/accounts';
import { IService } from '../interfaces/IService';
import { StatusCodes } from 'http-status-codes';
import { NUMBER } from 'sequelize';

const INITIAL_VALUE_BALANCE = 100;

export default class UserService implements IService {
  async create(username: string, password: string): Promise<User> {
    const balance = INITIAL_VALUE_BALANCE;

    try {
      const account: Account = await Account.create({ balance });
      const user: User = await User.create({ accountId: account.id, username, password });
      return user;
    } catch (err) {
      const e = new Error('Atendimento para esse pet e esse veterinário já existe');
      e.name = 'ConflictError';
      throw e;
    }
  }

  async login(username: string, password: string): Promise<User> {

    const user: User | null = await User.findOne({ where: { username } });

    if (!user) {
      const e = new Error('Usuario não encontrado');
      e.name = 'NotFound';
      throw e;
    }

    return user;
  }
}
