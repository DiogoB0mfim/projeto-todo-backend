import { Request, Response } from "express";
import { TaskBusiness } from "../business/TaskBusiness";
import { TaskDTO } from "../models/Task";

const taskBusiness = new TaskBusiness();

export class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { idUser, title, description, idWorkspace, status } = req.body;
      const token = req.headers.authorization as string;

      const newTask: TaskDTO = {
        idUser,
        title,
        description,
        idWorkspace,
        status,
      };

      await taskBusiness.createTask(newTask, token);
      res.status(200).send({ result: "Task criada com sucesso!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;

      const result = await taskBusiness.getAllTasks(token);
      res.status(200).send({ result: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;

      await taskBusiness.deleteTask(id, token);
      res.status(200).send({ result: "Task deletada!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async updateTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id, status } = req.body;
      const token = req.headers.authorization as string;

      await taskBusiness.updateTaskStatus(id, status, token);
      res.status(200).send({ result: "Task atualizada!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
