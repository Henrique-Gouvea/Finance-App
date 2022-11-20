import User from '../database/models/users';
import Account from '../database/models/accounts';
import { IService } from '../interfaces/IService';

const INITIAL_VALUE_BALANCE = 100;

export default class UserService implements IService {
  async create(username: string, password: string): Promise<User> {
    console.log('teste');

    console.log(this.create);
    console.log('teste2');

    const balance = INITIAL_VALUE_BALANCE;

    const account: Account = await Account.create({ balance });
    const user: User = await User.create({ accountId: account.id, username, password });
    console.log('teetet');

    return user;
  }

  async login(username: string, password: string): Promise<User> {
    console.log(this.login);

    const user: User | null = await User.findOne({ where: { username } });

    if (!user) {
      const e = new Error('Usuario não encontrado');
      e.name = 'NotFound';
      throw e;
    }


    return user;
  }
}
