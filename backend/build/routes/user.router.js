"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_services_1 = __importDefault(require("../services/user.services"));
const router = (0, express_1.Router)();
const userService = new user_services_1.default();
const userController = new user_controller_1.default(userService);
router.post('/cadaster', userController.create.bind(userController));
router.post('/login', userController.login.bind(userController));
exports.default = router;
