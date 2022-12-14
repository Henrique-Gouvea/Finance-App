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
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class TransactionController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    cashOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, cashOutValue, user } = req.body;
                const valuesTransaction = yield this.transactionsService
                    .validateTrasaction(username, Number(cashOutValue), user);
                yield this.transactionsService.transaction(valuesTransaction);
                res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Transaction Sucess' });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllTransactions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.body;
                const transactions = yield this.transactionsService.getAllTransactions(user);
                res.status(http_status_codes_1.StatusCodes.OK).json(transactions);
            }
            catch (err) {
                next(err);
            }
        });
    }
    filterTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cashOut, cashIn, startDate, endDate, user } = req.body;
                const transactions = yield this.transactionsService
                    .filterTransaction(cashOut, cashIn, startDate, endDate, user);
                res.status(http_status_codes_1.StatusCodes.OK).json(transactions);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = TransactionController;
