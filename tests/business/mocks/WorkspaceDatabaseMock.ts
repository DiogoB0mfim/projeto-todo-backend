import { WorkspaceRepository } from "../../../src/business/repository/WorkspaceRepository";
import { Workspace, WorkspaceDTO } from "../../../src/models/Workspace";
import { allWorkspace } from "./WorkspaceMock";

export class TaskDatabaseMock implements WorkspaceRepository {
  public async createWorkspace(workspace: WorkspaceDTO): Promise<void> {}

  public async getAllUserWorkspaces(id: string): Promise<Workspace[]> {
    return allWorkspace;
  }

  public async deleteWorkspace(id: string): Promise<void> {}
}
