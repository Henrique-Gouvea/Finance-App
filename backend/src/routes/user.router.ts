import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.services';
import uservalidation from '../middleware/validations/user.validation';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/cadaster', uservalidation, userController.create.bind(userController));
router.post('/login', uservalidation, userController.login.bind(userController));

export default router;
