import { Request, Response } from "express";
import { WorkspaceBusiness } from "../business/WorkspaceBusiness";
import { WorkspaceDTO } from "../models/Workspace";

export class WorkSpaceController {
  constructor(
    private workspaceBusiness : WorkspaceBusiness
  ){};

  async createWorkspace(req: Request, res: Response): Promise<void> {
    try {
      const { idUser, name } = req.body;
      const token = req.headers.authorization as string;

      const newWorkspace: WorkspaceDTO = {
        idUser,
        name,
      };

      await this.workspaceBusiness.createWorkspace(newWorkspace, token);
      res.status(200).send({ result: "Workspace criado com sucesso!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getAllUserWorkspaces(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;

      const result = await this.workspaceBusiness.getAllUserWorkspaces(id, token);
      res.status(200).send({ result: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async deleteWorkspace(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;

      await this.workspaceBusiness.deleteWorkspace(id, token);
      res.status(200).send({ result: "Workspace deletado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
