import express from "express";
import { TaskBusiness } from "../business/TaskBusiness";
import { TaskController } from "../controller/TaskController";
import { TaskDatabase } from "../database/TaskDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const taskRouter = express.Router();

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const taskDatabase = new TaskDatabase();
const taskBusiness = new TaskBusiness(taskDatabase, idGenerator, tokenGenerator);
const taskController = new TaskController(taskBusiness);

// Path para criar uma task
taskRouter.post("/create-task", (req, res) => taskController.createTask (req, res));

// Path para pegar tasks de um user
taskRouter.get("/get-all/:id", (req, res) => taskController.getAllUserTasks (req, res));

// Path para deletar uma task
taskRouter.delete("/delete-task/:id", (req, res) => taskController.deleteTask (req, res));

// Path para atualizar status de uma task
taskRouter.put("/update-task", (req, res) => taskController.updateTaskStatus (req, res));

