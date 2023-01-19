import { WorkspaceDatabase } from "../database/WorkspaceDatabase";
import {
  CustomError,
  InvalidAuthData,
  InvalidInfos,
} from "../error/CustomError";
import { Workspace, WorkspaceDTO } from "../models/Workspace";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const workspaceDatabase = new WorkspaceDatabase();
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class WorkspaceBusiness {
  async createWorkspace(workspace: WorkspaceDTO, token: string): Promise<void | string> {
    try {
      const { idUser, name } = workspace;

      if (!idUser || !name) {
        throw new InvalidInfos();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const id = idGenerator.generate();

      const newWorkspace: Workspace = {
        id: id,
        idUser,
        name,
      };

      await workspaceDatabase.createWorkspace(newWorkspace);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getAllWorkspaces(token: string): Promise<Workspace[] | string> {
    try {
      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const result = await workspaceDatabase.getAllWorkspaces();
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async deleteWorkspace(id: string, token: string): Promise<void> {
    try {
      if (!id) {
        throw new InvalidInfos();
      }

      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      await workspaceDatabase.deleteWorkspace(id);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
