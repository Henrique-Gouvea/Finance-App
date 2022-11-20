import User from '../database/models/users';
import Account from '../database/models/accounts';
import { IServiceUser } from '../interfaces/IService';
import { IToken } from '../interfaces/providers/IToken';
import { ICrypto } from '../interfaces/providers/ICrypto';

const INITIAL_VALUE_BALANCE = 100;

export default class UserService implements IServiceUser {
  constructor(
    private token: IToken,
    private crypto: ICrypto,
  ) { }

  async create(username: string, password: string): Promise<string> {
    const userDB: User | null = await User.findOne({ where: { username } });
    if (userDB) {
      const e = new Error('Usuario ja cadastrado!');
      e.name = 'Conflict';
      throw e;
    }

    const balance = INITIAL_VALUE_BALANCE;
    const passwordHash = this.crypto.encryptPassword(password);
    try {
      const account: Account = await Account.create({ balance });
      await User.create({ accountId: account.id, username, password: passwordHash });
    } catch {
      const e = new Error('Erro ao conectar com o banco "create"');
      throw e;
    }
    const token = this.token.generateToken(username);

    return token;
  }

  async login(username: string, password: string): Promise<User> {
    const user: User | null = await User.findOne({ where: { username } });
    let valid = false;
    if (user) {
      valid = this.crypto.verifyPassword(password, user.password);
    }

    if (!valid || !user) {
      const e = new Error('Usuario ou senha incorreto.');
      e.name = 'NotFound';
      throw e;
    }

    return user;
  }

  async getBalance(user: string): Promise<number> {
    console.log(this.getBalance);

    const userDB: User | null = await User.findOne({ where: { username: user } });
    let account = null;
    if (userDB) {
      account = await Account.findOne({ where: { id: userDB.id } });
    }

    if (!account) {
      const e = new Error('Erro na consulta');
      e.name = 'NotFound';
      throw e;
    }

    return account.balance;
  }
}
