import { UserRepository } from "../../../src/business/repository/UserRepository";
import { User, UserDTO } from "../../../src/models/User";
import { AllUser } from "./UserMock";

export class UserDatabaseMock implements UserRepository {
  public async signUp(user: UserDTO): Promise<any> {}

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return email === "email" ? AllUser[0] : undefined;
  }

  public async getAllUsers(): Promise<User[]> {
    return AllUser;
  }
}
