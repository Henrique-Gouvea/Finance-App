import User from '../database/models/users';
import Account from '../database/models/accounts';
import { IService } from '../interfaces/IService';
import passwordService from '../helpers/password';

const INITIAL_VALUE_BALANCE = 100;

export default class UserService implements IService {
  async create(username: string, password: string): Promise<User> {
    console.log(this.create);

    const userDB: User | null = await User.findOne({ where: { username } });
    if (userDB) {
      const e = new Error('Usuario ja cadastrado!');
      e.name = 'Conflict';
      throw e;
    }

    const balance = INITIAL_VALUE_BALANCE;
    const passwordHash = passwordService.encryptPassword(password);

    const account: Account = await Account.create({ balance });
    const user: User = await User.create({
      accountId: account.id, username, password: passwordHash,
    });

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
