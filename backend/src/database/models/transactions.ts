import { INTEGER, Model, DATE } from 'sequelize';
import db from '.';
import Account from './accounts';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  underscored: true,
});

Account.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedAccountId' });
Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debited' });

Account.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedAccountId' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'credited' });

export default Transaction;
