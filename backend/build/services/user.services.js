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
const users_1 = __importDefault(require("../database/models/users"));
const accounts_1 = __importDefault(require("../database/models/accounts"));
const INITIAL_VALUE_BALANCE = 100;
class UserService {
    create(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.create);
            const balance = INITIAL_VALUE_BALANCE;
            const account = yield accounts_1.default.create({ balance });
            const user = yield users_1.default.create({ accountId: account.id, username, password });
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.login);
            const user = yield users_1.default.findOne({ where: { username } });
            if (!user) {
                const e = new Error('Usuario não encontrado');
                e.name = 'NotFound';
                throw e;
            }
            return user;
        });
    }
}
exports.default = UserService;
