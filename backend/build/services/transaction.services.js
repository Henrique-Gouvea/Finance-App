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
/* eslint-disable max-lines-per-function */
const users_1 = __importDefault(require("../database/models/users"));
const accounts_1 = __importDefault(require("../database/models/accounts"));
class TransactionService {
    cashOut(usernameCashIn, cashOutValue, usernameCashOut) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.cashOut);
            if (usernameCashIn === usernameCashOut) {
                const e = new Error('Transferencia para mesma conta');
                e.name = 'Unauthorized';
                throw e;
            }
            const userDB = yield users_1.default.findOne({ where: { username: usernameCashOut } });
            let account = null;
            if (userDB) {
                account = yield accounts_1.default.findOne({ where: { id: userDB.id } });
            }
            if (account && (account.balance < cashOutValue)) {
                const e = new Error('Valor de transferencia mais alta que o saldo em conta.');
                e.name = 'Conflict';
                throw e;
            }
        });
    }
}
exports.default = TransactionService;
