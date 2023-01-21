import express from "express";
import { WorkspaceBusiness } from "../business/WorkspaceBusiness";
import { WorkSpaceController } from "../controller/WorkspaceController";
import { WorkspaceDatabase } from "../database/WorkspaceDatabase";
import {IdGenerator} from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const workspaceRouter = express.Router();

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const workspaceDatabase = new WorkspaceDatabase();
const workspaceBusiness = new WorkspaceBusiness(workspaceDatabase, idGenerator, tokenGenerator);
const workspaceController = new WorkSpaceController(workspaceBusiness);

// Path para criar um workspace
workspaceRouter.post("/create-workspace", (req, res) => workspaceController.createWorkspace (req, res));

// Path para pegar workspaces de um usuário
workspaceRouter.get("/get-all/:id", (req, res) => workspaceController.getAllUserWorkspaces (req, res));

// Path para deletar workspace
workspaceRouter.delete("/delete-workspace/:id", (req, res) => workspaceController.deleteWorkspace (req, res));

