import { Task, TaskStatus } from "../../models/Task";

export interface TaskRepository {
  createTask(task: Task): Promise<void>;

  getAllUserTasks(id : string): Promise<Task[]>;

  deleteTask(id: string): Promise<void>;

  updateTaskStatus(idTask : string, status : TaskStatus): Promise<void>;
}
