export enum TaskStatus {
  TODO = "TO_DO",
  INPROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type Task = {
  id: string;
  idUser: string;
  title: string;
  description: string;
  idWorkspace: string;
  status: TaskStatus;
};

export interface TaskDTO {
  idUser: string;
  title: string;
  description: string;
  idWorkspace: string;
  status: TaskStatus;
}
