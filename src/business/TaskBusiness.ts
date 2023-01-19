import { TaskDatabase } from "../database/TaskDatabase";
import {
  CustomError,
  InvalidAuthData,
  InvalidInfos,
  InvalidStatus,
} from "../error/CustomError";
import { Task, TaskDTO, TaskStatus } from "../models/Task";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const taskDatabase = new TaskDatabase();
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class TaskBusiness {
  async createTask(task: TaskDTO, token: string): Promise<void | string> {
    try {
      const { idUser, title, description, idWorkspace, status } = task;

      if (!idUser || !title || !description || !idWorkspace || !status) {
        throw new InvalidInfos();
      }

      if (status !== TaskStatus.TODO && status !== TaskStatus.COMPLETED && status !== TaskStatus.INPROGRESS) {
        throw new InvalidStatus();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const id = idGenerator.generate();

      const newTask: Task = {
        id,
        idUser,
        title,
        description,
        idWorkspace,
        status,
      };

      await taskDatabase.createTask(newTask);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getAllTasks(token: string): Promise<Task[] | string> {
    try {
      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const result = await taskDatabase.getAllTasks();
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async deleteTask(id: string, token: string): Promise<void> {
    try {
      if (!id) {
        throw new InvalidInfos();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      await taskDatabase.deleteTask(id);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async updateTaskStatus(idTask: string, status: TaskStatus, token : string): Promise<void> {
    try {
      if (!idTask || !status || !token) {
        throw new InvalidStatus();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      if (status !== TaskStatus.TODO && status !== TaskStatus.COMPLETED && status !== TaskStatus.INPROGRESS) {
        throw new InvalidStatus();
      }

      await taskDatabase.updateTaskStatus(idTask, status)
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
