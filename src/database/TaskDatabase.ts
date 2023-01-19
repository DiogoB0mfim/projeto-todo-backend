import { Task, TaskStatus } from "../models/Task";
import BaseDatabase from "./BaseDatabase";

export class TaskDatabase extends BaseDatabase {
  private static table = "Todo_tasks";

  public async createTask(task: Task): Promise<void> {
    await BaseDatabase.connection(TaskDatabase.table).insert({
      id: task.id,
      id_user: task.idUser,
      title: task.title,
      description: task.description,
      id_workspace: task.idWorkspace,
      status: task.status,
    });
  }

  public async getAllTasks(): Promise<Task[]> {
    const result = await BaseDatabase.connection(TaskDatabase.table)
    .select();

    return result;
  }

  public async deleteTask(id: string): Promise<void> {
    await BaseDatabase.connection(TaskDatabase.table)
    .where({ id })
    .del();
  }

  public async updateTaskStatus(idTask : string, status : TaskStatus): Promise<void> {
    await BaseDatabase.connection(TaskDatabase.table)
    .where("id", idTask)
    .update({status})
  }
}
