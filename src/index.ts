import { app } from "./app";
import { userRouter } from "./router/UserRouter";
import { workspaceRouter } from "./router/WorkspaceRouter";

app.use("/user", userRouter);
app.use("/workspace", workspaceRouter);
