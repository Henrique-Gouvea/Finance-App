import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Accounts extends Model {
  public id!: number;
  public balance!: string;
}

Accounts.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  balance: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

export default Accounts;
