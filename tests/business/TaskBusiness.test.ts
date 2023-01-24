import { TaskBusiness } from "../../src/business/TaskBusiness";
import { CustomError } from "../../src/error/CustomError";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { TaskDatabaseMock } from "./mocks/TaskDatabaseMock";
import { TaskStatus } from "../../src/models/Task";

const idGenerator = new IdGeneratorMock();

const taskBusiness = new TaskBusiness(
  new TaskDatabaseMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Teste de criar task", () => {
  test("Teste 1 : ", async () => {
    expect.assertions(2);
    try {
      const mock = {
        idUser: "",
        title: "",
        description: "",
        idWorkspace: "2345678",
        status: TaskStatus.TODO,
      };

      await taskBusiness.createTask(mock, "token");
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Um ou mais dados inválidos!");
    }
  });
});
