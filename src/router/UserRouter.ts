import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

// Path para criar um usuário
userRouter.post("/signup", userController.signUp);

// Path para logar um usuário
userRouter.post("/login", userController.login);
