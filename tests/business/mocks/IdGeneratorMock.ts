import { IIdGenerator } from "../../../src/business/Port";

export class IdGeneratorMock implements IIdGenerator {
  public generate = jest.fn(() => {
    return "id";
  });
}
