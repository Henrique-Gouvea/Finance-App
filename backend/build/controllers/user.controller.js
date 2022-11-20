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
// import User from '../database/models/users';
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const token = yield this.userService.create(username, password);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(token);
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield this.userService.login(username, password);
                res.status(http_status_codes_1.StatusCodes.OK).json({ user: user.username, id: user.id });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getBalance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.body;
                const balance = yield this.userService.getBalance(user);
                res.status(http_status_codes_1.StatusCodes.OK).json({ balance });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;
