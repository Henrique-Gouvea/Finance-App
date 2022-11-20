import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.services';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/cadaster', userController.create.bind(userController));
router.post('/login', userController.login.bind(userController));

export default router;
