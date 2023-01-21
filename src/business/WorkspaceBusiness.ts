import {
  CustomError,
  InvalidAuthData,
  InvalidInfos,
} from "../error/CustomError";
import { Workspace, WorkspaceDTO } from "../models/Workspace";
import { IIdGenerator, ITokenGenerator } from "./Port";
import { WorkspaceRepository } from "./repository/WorkspaceRepository";

export class WorkspaceBusiness {
  constructor(
    private workspaceDatabase: WorkspaceRepository,
    private idGenerator: IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ) {}

  async createWorkspace(workspace: WorkspaceDTO, token: string): Promise<void | string> {
    try {
      const { idUser, name } = workspace;

      if (!idUser || !name) {
        throw new InvalidInfos();
      }

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const id = this.idGenerator.generate();

      const newWorkspace: Workspace = {
        id: id,
        idUser,
        name,
      };

      await this.workspaceDatabase.createWorkspace(newWorkspace);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getAllUserWorkspaces(id: string, token: string): Promise<Workspace[] | string> {
    try {
      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const result = await this.workspaceDatabase.getAllUserWorkspaces(id);
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

      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      await this.workspaceDatabase.deleteWorkspace(id);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
