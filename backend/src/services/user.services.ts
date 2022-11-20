import User from '../database/models/users';
import Account from '../database/models/accounts';
import { IService } from '../interfaces/IService';

export default class UserService implements IService {
  async create(username: string, password: string): Promise<User> {
    const balance = 100;

    const account: Account = await Account.create({ balance });

    const user: User = await User.create({ accountId: account.id, username, password });
    return user;
  }

  async login(username: string, password: string): Promise<User> {
    console.log('service' + password);

    const user: User | null = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    return user;
  }
}
