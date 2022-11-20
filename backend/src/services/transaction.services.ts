/* eslint-disable max-lines-per-function */
import User from '../database/models/users';
import Account from '../database/models/accounts';
import { IServiceTransactions } from '../interfaces/IService';

export default class TransactionService implements IServiceTransactions {
  async creditedTransaction()
    : Promise<void> {
    console.log(this.cashOut);

  }

  async cashOut(
    usernameCashIn: string,
    cashOutValue: number,
    usernameCashOut: string,
  )
    : Promise<void> {
    console.log(this.cashOut);

    if (usernameCashIn === usernameCashOut) {
      const e = new Error('Transferencia para mesma conta');
      e.name = 'Unauthorized';
      throw e;
    }

    const userDB: User | null = await User.findOne({ where: { username: usernameCashOut } });
    let account = null;
    if (userDB) {
      account = await Account.findOne({ where: { id: userDB.id } });
    }

    if (account && (account.balance < cashOutValue)) {
      const e = new Error('Valor de transferencia mais alta que o saldo em conta.');
      e.name = 'Conflict';
      throw e;
    }
  }
}
