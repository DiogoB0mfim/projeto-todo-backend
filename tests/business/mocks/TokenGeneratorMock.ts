import { ITokenGenerator } from "../../../src/business/Port";

export class TokenGeneratorMock implements ITokenGenerator {
  public generateToken = jest.fn(() => {
    return "token";
  });

  public getData = jest.fn(() => {
    return { id: "id" };
  });
}
