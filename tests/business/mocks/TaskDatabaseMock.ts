import { TaskRepository } from "../../../src/business/repository/TaskRepository";
import { Task, TaskDTO, TaskStatus } from "../../../src/models/Task";
import { allTask } from "./TaskMock";

export class TaskDatabaseMock implements TaskRepository {
  public async createTask(task: TaskDTO): Promise<void> {}

  public async getAllUserTasks(id: string): Promise<Task[]> {
    return allTask;
  }

  public async deleteTask(id: string): Promise<void> {}

  public async updateTaskStatus(idTask: string, status: TaskStatus): Promise<void> {}
}
