import { Task, TaskStatus } from "../../../src/models/Task";

export const allTask: Task[] = [{
    id: "1234567",
    idUser: "2",
    title: "Dormir",
    description: "Preciso dormir",
    idWorkspace: "2345",
    status: TaskStatus.TODO,
  },

  {
    id: "567890",
    idUser: "1",
    title: "Comer",
    description: "Preciso comer",
    idWorkspace: "2345",
    status: TaskStatus.TODO,
  }];