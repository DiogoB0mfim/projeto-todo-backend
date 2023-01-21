import express from "express";
import { WorkSpaceController } from "../controller/WorkspaceController";

export const workspaceRouter = express.Router();

const workspaceController = new WorkSpaceController();

// Path para criar um workspace
workspaceRouter.post("/create-workspace", workspaceController.createWorkspace);

// Path para pegar workspaces de um usuário
workspaceRouter.get("/get-all/:id", workspaceController.getAllUserWorkspaces);

// Path para deletar workspace
workspaceRouter.delete("/delete-workspace/:id", workspaceController.deleteWorkspace);

