import { Workspace } from "../models/Workspace";
import BaseDatabase from "./BaseDatabase";

export class WorkspaceDatabase extends BaseDatabase {
  private static table = "Todo_workspaces";

  public async createWorkspace(workspace: Workspace): Promise<void> {
    await BaseDatabase.connection(WorkspaceDatabase.table).insert({
      id: workspace.id,
      id_user: workspace.idUser,
      name: workspace.name,
    });
  }

  public async getAllUserWorkspaces(id : string): Promise<Workspace[]> {
    const result = await BaseDatabase.connection(WorkspaceDatabase.table)
    .where({ "id_user" : id })
    .select();

    return result;
  }

  public async deleteWorkspace(id: string): Promise<void> {
    await BaseDatabase.connection(WorkspaceDatabase.table)
    .where({ id })
    .del();
  }
}
