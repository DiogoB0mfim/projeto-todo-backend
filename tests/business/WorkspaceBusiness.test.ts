import { WorkspaceBusiness } from "../../src/business/WorkspaceBusiness";
import { CustomError } from "../../src/error/CustomError";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { WorkspaceDatabaseMock } from "./mocks/WorkspaceDatabaseMock";

const idGenerator = new IdGeneratorMock();

const workspaceBusiness = new WorkspaceBusiness(
  new WorkspaceDatabaseMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Teste de criar workspace", () => {
  test("Teste 1 : testando se as informações estão completas", async () => {
    expect.assertions(2);
    try {
      const mock = {
        idUser: "123",
        name: "",
      };

      await workspaceBusiness.createWorkspace(mock, "token");
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Um ou mais dados inválidos!");
    }
  });
});
