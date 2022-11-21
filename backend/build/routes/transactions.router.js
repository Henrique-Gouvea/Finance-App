"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const transaction_services_1 = __importDefault(require("../services/transaction.services"));
const tokenProvider_1 = __importDefault(require("../providers/tokenProvider"));
const tokenMiddleware_1 = __importDefault(require("../middleware/tokenMiddleware"));
const tokenProv = new tokenProvider_1.default();
const tokenMiddleware = new tokenMiddleware_1.default(tokenProv);
const router = (0, express_1.Router)();
const transactionService = new transaction_services_1.default();
const transactionController = new transaction_controller_1.default(transactionService);
router.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));
router.post('/cash-out', transactionController.cashOut.bind(transactionController));
exports.default = router;
