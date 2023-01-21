import express from "express";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const userRouter = express.Router();

const hashManager = new HashManager();
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const userDatabase = new UserDatabase();
const userBusiness = new UserBusiness(userDatabase, hashManager, idGenerator, tokenGenerator);
const userController = new UserController(userBusiness);

// Path para criar um usuário
userRouter.post("/signup", (req, res) => userController.signUp (req, res));

// Path para logar um usuário
userRouter.post("/login", (req, res) => userController.login (req, res));

// Path para pegar todos usuários
userRouter.get("/get-all", (req, res) => userController.getAllUsers (req, res));
