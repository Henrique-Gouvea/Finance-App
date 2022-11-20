import { INTEGER, Model } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  underscored: true,
});

export default Account;
