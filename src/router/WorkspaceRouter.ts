import express from "express";
import { WorkSpaceController } from "../controller/WorkspaceController";

export const workspaceRouter = express.Router();

const workspaceController = new WorkSpaceController();

// Path para criar um workspace
workspaceRouter.post("/create-workspace", workspaceController.createWorkspace);

// Path para pegar workspaces
workspaceRouter.get("/get-all", workspaceController.getAllWorkspaces);
