import express from "express";
import { TaskController } from "../controller/TaskController";

export const taskRouter = express.Router();

const taskController = new TaskController();

// Path para criar uma task
taskRouter.post("/create-task", taskController.createTask);

// Path para pegar tasks
taskRouter.get("/get-all", taskController.getAllTasks);

// Path para deletar uma task
taskRouter.delete("/delete-task/:id", taskController.deleteTask);

// Path para atualizar status de uma task
taskRouter.put("/update-task", taskController.updateTaskStatus);

