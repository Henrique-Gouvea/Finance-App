import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.services';
import uservalidation from '../middleware/validations/user.validation';
import TokenProvider from '../providers/tokenProvider';
import CryptoProvider from '../providers/cryptoProvider';
import TokenMiddleware from '../middleware/tokenMiddleware';

const tokenProv = new TokenProvider();
const cryptoProv = new CryptoProvider();
const tokenMiddleware = new TokenMiddleware(tokenProv);

const router = Router();

const userService = new UserService(tokenProv, cryptoProv);
const userController = new UserController(userService);

router.post('/cadaster', uservalidation, userController.create.bind(userController));

router.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));

router.post('/login', uservalidation, userController.login.bind(userController));

router.get('/balance', userController.getBalance.bind(userController));

export default router;
