import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { UserService } from '../services/user.services';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/cadaster', userController.create);

export default router;
