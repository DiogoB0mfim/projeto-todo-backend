import { UserDatabase } from "../database/UserDatabase";
import { User, UserDTO, UserLogin } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import {
  CustomError,
  EmailAlreadyExists,
  InvalidAuthData,
  InvalidEmail,
  InvalidInfos,
  InvalidPassword,
  InvalidUser,
} from "../error/CustomError";

const userDatabase = new UserDatabase();
const hashManager = new HashManager();
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class UserBusiness {
  async signUp(user: UserDTO): Promise<string> {
    try {
      const { firstName, lastName, email, password } = user;

      if (!firstName || !lastName || !email || !password) {
        throw new InvalidInfos();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (password.length < 8) {
        throw new InvalidPassword();
      }

      const findUser = await userDatabase.findUserByEmail(email);

      if (findUser !== undefined) {
        throw new EmailAlreadyExists();
      }

      const id = idGenerator.generate();
      const hashPass = await hashManager.hash(password);

      const newUser: User = {
        id: id,
        firstName,
        lastName,
        email,
        password: hashPass,
      };

      await userDatabase.signUp(newUser);
      const token = tokenGenerator.generateToken({ id });

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async login(login: UserLogin): Promise<object> {
    try {
      const { email, password } = login;

      if (!email || !password) {
        throw new InvalidInfos();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const user = await userDatabase.findUserByEmail(email);

      if (user === undefined) {
        throw new InvalidUser();
      }

      const isValidPass = await hashManager.compare(password, user.password);

      if (!isValidPass) {
        throw new InvalidUser();
      }

      const token = tokenGenerator.generateToken({ id: user.id });

      const result = {token, user}

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getAllUsers(token: string): Promise<User[] | string> {
    try {
      const authData = tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const result = await userDatabase.getAllUsers();
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
