import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import TransactionService from '../services/transaction.services';
import TokenProvider from '../providers/tokenProvider';
import TokenMiddleware from '../middleware/tokenMiddleware';

const tokenProv = new TokenProvider();
const tokenMiddleware = new TokenMiddleware(tokenProv);

const router = Router();

const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);

router.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));

router.post('/cash-out', transactionController.cashOut.bind(transactionController));

export default router;
