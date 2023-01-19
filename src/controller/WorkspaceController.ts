import { Request, Response } from "express";
import { WorkspaceBusiness } from "../business/WorkspaceBusiness";
import { WorkspaceDTO } from "../models/Workspace";

const workspaceBusiness = new WorkspaceBusiness();

export class WorkSpaceController {
  async createWorkspace(req: Request, res: Response): Promise<void> {
    try {
      const { idUser, name } = req.body;
      const token = req.headers.authorization as string;

      const newWorkspace: WorkspaceDTO = {
        idUser,
        name,
      };

      await workspaceBusiness.createWorkspace(newWorkspace, token);
      res.status(200).send({ result: "Workspace criado com sucesso!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getAllWorkspaces(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;

      const result = await workspaceBusiness.getAllWorkspaces(token);
      res.status(200).send({ result: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async deleteWorkspace(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const token = req.headers.authorization as string;

      await workspaceBusiness.deleteWorkspace(id, token);
      res.status(200).send({ result: "Workspace deletado!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
