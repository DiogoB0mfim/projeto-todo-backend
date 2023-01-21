import { Workspace } from "../../models/Workspace";

export interface WorkspaceRepository {
  createWorkspace(workspace: Workspace): Promise<void>;

  getAllUserWorkspaces(id: string): Promise<Workspace[]>;

  deleteWorkspace(id: string): Promise<void>;
}
