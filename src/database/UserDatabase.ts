import { User } from "../models/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static table = "Todo_users";

  public async signUp(user: User) : Promise<void> {
    await BaseDatabase.connection(UserDatabase.table).insert({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
    });
  }

  public async findUserByEmail(email: string) : Promise<User> {
    const result = await BaseDatabase.connection(UserDatabase.table)
      .select()
      .where({ email });

    return result[0];
  }

  public async getAllUsers(): Promise<User[]> {
    const result = await BaseDatabase.connection(UserDatabase.table)
    .select();

    return result;
  }
}
