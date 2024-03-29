/* eslint-disable class-methods-use-this */
/* eslint-disable max-lines-per-function */
import { Op } from 'sequelize';
import User from '../database/models/users';
import Account from '../database/models/accounts';
import Transaction from '../database/models/transactions';
import { IServiceTransactions } from '../interfaces/IService';
import { ITransaction } from '../interfaces/values/ITransaction';

export default class TransactionService implements IServiceTransactions {
  async transaction({
    debitedAccountId,
    creditedAccountId,
    value,
    debitedBalanceUpdated,
    creditedBalanceUpdated,
  }: ITransaction): Promise<void> {
    try {
      await Transaction.create({ debitedAccountId, creditedAccountId, value });
      await Account.update({ balance: debitedBalanceUpdated }, { where: { id: debitedAccountId } });
      await Account.update(
        { balance: creditedBalanceUpdated },
        { where: { id: creditedAccountId } },
      );
    } catch (err) {
      const e = new Error('Erro transferencia');
      throw e;
    }
  }

  async validateTrasaction(
    usernameCashIn: string,
    cashOutValue: number,
    usernameCashOut: string,
  )
    : Promise<ITransaction> {
    if (usernameCashIn === usernameCashOut) {
      const e = new Error('Transferencia para mesma conta');
      e.name = 'Unauthorized';
      throw e;
    }

    const userCashOut: User | null = await User.findOne({ where: { username: usernameCashOut } });
    const userCashIn: User | null = await User.findOne({ where: { username: usernameCashIn } });

    if (!userCashIn) {
      const e = new Error('O Usuario informado para transferencia não existe');
      e.name = 'Unauthorized';
      throw e;
    }

    let accountUserCashOut = null;
    let accountUserCashIn = null;

    if (userCashOut) {
      accountUserCashOut = await Account.findOne({ where: { id: userCashOut.id } });
      accountUserCashIn = await Account.findOne({ where: { id: userCashIn.id } });
    }

    if (accountUserCashOut && (accountUserCashOut.balance < cashOutValue)) {
      const e = new Error('Valor de transferencia mais alta que o saldo em conta.');
      e.name = 'Unauthorized';
      throw e;
    }

    if (!userCashOut || !accountUserCashOut || !accountUserCashIn) throw new Error();

    return {
      debitedAccountId: userCashOut.id,
      creditedAccountId: userCashIn.id,
      value: cashOutValue,
      debitedBalanceUpdated: Number(accountUserCashOut.balance) - cashOutValue,
      creditedBalanceUpdated: Number(accountUserCashIn.balance) + cashOutValue,
    };
  }

  async getAllTransactions(user: string): Promise<Transaction[]> {
    try {
      const userDB: User | null = await User.findOne({ where: { username: user } });
      let transactions: Transaction[] = [];
      if (userDB) {
        const id = userDB.accountId;

        transactions = await Transaction
          .findAll({
            where: {
              [Op.or]: [
                { debitedAccountId: id },
                { creditedAccountId: id },
              ],
            },
          });
      }
      return transactions;
    } catch (err) {
      const e = new Error('Erro na transferencia');
      throw e;
    }
  }

  async filterTransaction(
    cashOut: boolean,
    cashIn: boolean,
    date: string,
    user: string,
  ): Promise<Transaction[]> {
    try {
      const userDB: User | null = await User.findOne({ where: { username: user } });
      let transactions: Transaction[] = [];
      if (userDB) {
        const id = userDB.accountId;

        transactions = await Transaction
          .findAll({
            where: {
              [Op.or]: [
                { debitedAccountId: cashOut ? id : 0 },
                { creditedAccountId: cashIn ? id : 0 },
              ],
            },
          });
      }
      console.log(transactions);

      // const dateFilteredTransactions = transactions.filter((transaction) => )
      // console.log(dateFilteredTransactions);

      return transactions;
    } catch (err) {
      const e = new Error('Erro na transferencia');
      throw e;
    }
  }
}
