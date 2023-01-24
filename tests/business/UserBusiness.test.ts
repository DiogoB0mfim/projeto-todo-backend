import { UserBusiness } from "../../src/business/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";

const idGenerator = new IdGeneratorMock();

const userBusiness = new UserBusiness(
  new UserDatabaseMock(),
  new HashManagerMock(),
  idGenerator,
  new TokenGeneratorMock()
);

describe("Teste de criar usuário", () => {
  test("Teste 1 : testando se o e-mail é válido", async () => {
    expect.assertions(2);
    try {
      const mock = {
        firstName: "John",
        lastName: "Doe",
        email: "johnemail.com",
        password: "12345678",
      };

      await userBusiness.signUp(mock);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("E-mail inválido!");
    }
  });

  test("Teste 2 : testando se a senha possui mais de 7 dígitos", async () => {
    expect.assertions(2);
    try {
      const mock = {
        firstName: "John",
        lastName: "Doe",
        email: "john@email.com",
        password: "1234567",
      };

      await userBusiness.signUp(mock);
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Senha inválida!");
    }
  });
});
