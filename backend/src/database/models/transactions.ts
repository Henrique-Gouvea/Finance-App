import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';

class Transactions extends Model {
  public id!: number;
  public debitedAccountId!: string;
  public creditedAccountId!: string;
}

Transactions.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
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
}, {
  underscored: true,
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

export default Transactions;
