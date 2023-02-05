import { User, UserDTO } from "../../models/User";

export interface UserRepository {
  signUp(user: UserDTO): Promise<any>;

  findUserByEmail(email: string): Promise<User | undefined>;

  getAllUsers(): Promise<User[]>;

  getUserById(id : string): Promise<User>;
}
