"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable max-lines-per-function */
const sequelize_1 = require("sequelize");
const users_1 = __importDefault(require("../database/models/users"));
const accounts_1 = __importDefault(require("../database/models/accounts"));
const transactions_1 = __importDefault(require("../database/models/transactions"));
class TransactionService {
    transaction({ debitedAccountId, creditedAccountId, value, debitedBalanceUpdated, creditedBalanceUpdated, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transactions_1.default.create({ debitedAccountId, creditedAccountId, value });
                yield accounts_1.default.update({ balance: debitedBalanceUpdated }, { where: { id: debitedAccountId } });
                yield accounts_1.default.update({ balance: creditedBalanceUpdated }, { where: { id: creditedAccountId } });
            }
            catch (err) {
                const e = new Error('Erro transferencia');
                throw e;
            }
        });
    }
    validateTrasaction(usernameCashIn, cashOutValue, usernameCashOut) {
        return __awaiter(this, void 0, void 0, function* () {
            if (usernameCashIn === usernameCashOut) {
                const e = new Error('Transferencia para mesma conta');
                e.name = 'Unauthorized';
                throw e;
            }
            const userCashOut = yield users_1.default.findOne({ where: { username: usernameCashOut } });
            const userCashIn = yield users_1.default.findOne({ where: { username: usernameCashIn } });
            if (!userCashIn) {
                const e = new Error('O Usuario informado para transferencia não existe');
                e.name = 'Unauthorized';
                throw e;
            }
            let accountUserCashOut = null;
            let accountUserCashIn = null;
            if (userCashOut) {
                accountUserCashOut = yield accounts_1.default.findOne({ where: { id: userCashOut.id } });
                accountUserCashIn = yield accounts_1.default.findOne({ where: { id: userCashIn.id } });
            }
            if (accountUserCashOut && (accountUserCashOut.balance < cashOutValue)) {
                const e = new Error('Valor de transferencia mais alta que o saldo em conta.');
                e.name = 'Unauthorized';
                throw e;
            }
            if (!userCashOut || !accountUserCashOut || !accountUserCashIn)
                throw new Error();
            return {
                debitedAccountId: userCashOut.id,
                creditedAccountId: userCashIn.id,
                value: cashOutValue,
                debitedBalanceUpdated: Number(accountUserCashOut.balance) - cashOutValue,
                creditedBalanceUpdated: Number(accountUserCashIn.balance) + cashOutValue,
            };
        });
    }
    getAllTransactions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDB = yield users_1.default.findOne({ where: { username: user } });
                let transactions = [];
                if (userDB) {
                    const id = userDB.accountId;
                    transactions = yield transactions_1.default
                        .findAll({
                        where: {
                            [sequelize_1.Op.or]: [
                                { debitedAccountId: id },
                                { creditedAccountId: id },
                            ],
                        },
                    });
                }
                return transactions;
            }
            catch (err) {
                const e = new Error('Erro na transferencia');
                throw e;
            }
        });
    }
    filterTransaction(cashOut, cashIn, date, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDB = yield users_1.default.findOne({ where: { username: user } });
                let transactions = [];
                if (userDB) {
                    const id = userDB.accountId;
                    transactions = yield transactions_1.default
                        .findAll({
                        where: {
                            [sequelize_1.Op.or]: [
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
            }
            catch (err) {
                const e = new Error('Erro na transferencia');
                throw e;
            }
        });
    }
}
exports.default = TransactionService;
