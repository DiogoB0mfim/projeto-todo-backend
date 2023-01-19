import { app } from "./app";
import { taskRouter } from "./router/TaskRouter";
import { userRouter } from "./router/UserRouter";
import { workspaceRouter } from "./router/WorkspaceRouter";

app.use("/user", userRouter);
app.use("/workspace", workspaceRouter);
app.use("/task", taskRouter);
