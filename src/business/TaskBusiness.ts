import {
  CustomError,
  InvalidAuthData,
  InvalidInfos,
  InvalidStatus,
} from "../error/CustomError";
import { Task, TaskDTO, TaskStatus } from "../models/Task";
import { IIdGenerator, ITokenGenerator } from "./Port";
import { TaskRepository } from "./repository/TaskRepository";

export class TaskBusiness {
  constructor(
    private taskDatabase: TaskRepository,
    private idGenerator: IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ) {}

  async createTask(task: TaskDTO, token: string): Promise<void | string> {
    try {
      const { idUser, title, description, idWorkspace, status } = task;

      if (!idUser || !title || !description || !idWorkspace || !status) {
        throw new InvalidInfos();
      }

      if (status !== TaskStatus.TODO && status !== TaskStatus.COMPLETED && status !== TaskStatus.INPROGRESS) {
        throw new InvalidStatus();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const id = this.idGenerator.generate();

      const newTask: Task = {
        id,
        idUser,
        title,
        description,
        idWorkspace,
        status,
      };

      await this.taskDatabase.createTask(newTask);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getAllUserTasks(id: string, token: string): Promise<Task[] | string> {
    try {
      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const result = await this.taskDatabase.getAllUserTasks(id);
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

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      await this.taskDatabase.deleteTask(id);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async updateTaskStatus(idTask: string, status: TaskStatus, token: string): Promise<void> {
    try {
      if (!idTask || !status || !token) {
        throw new InvalidStatus();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      if (status !== TaskStatus.TODO && status !== TaskStatus.COMPLETED && status !== TaskStatus.INPROGRESS) {
        throw new InvalidStatus();
      }

      await this.taskDatabase.updateTaskStatus(idTask, status);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
