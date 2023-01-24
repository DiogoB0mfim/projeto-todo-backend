import { IHashManager } from "../../../src/business/Port";

export class HashManagerMock implements IHashManager {
  public hash = jest.fn(async () => {
    return "hash";
  });

  public compare = jest.fn(async (s: string, hash: string) => {
    return s === hash;
  });
}
