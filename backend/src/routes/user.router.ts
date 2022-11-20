import { Router } from "express";
import UserController from "../controllers/usersController";
import { UserService } from "../services/userService";
const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/cadaster', userController.create);

export default router;
