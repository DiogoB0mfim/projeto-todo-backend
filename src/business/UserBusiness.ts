import { User, UserDTO, UserLogin } from "../models/User";
import {
  CustomError,
  EmailAlreadyExists,
  InvalidAuthData,
  InvalidEmail,
  InvalidInfos,
  InvalidPassword,
  InvalidUser,
} from "../error/CustomError";
import { UserRepository } from "./repository/UserRepository";
import { IHashManager, IIdGenerator, ITokenGenerator } from "./Port";

export class UserBusiness {
  constructor(
    private userDatabase: UserRepository,
    private hashManager: IHashManager,
    private idGenerator: IIdGenerator,
    private tokenGenerator: ITokenGenerator
  ) {}

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

      const findUser = await this.userDatabase.findUserByEmail(email);

      if (findUser !== undefined) {
        throw new EmailAlreadyExists();
      }

      const id = this.idGenerator.generate();
      const hashPass = await this.hashManager.hash(password);

      const newUser: User = {
        id: id,
        firstName,
        lastName,
        email,
        password: hashPass,
      };

      await this.userDatabase.signUp(newUser);
      const token = this.tokenGenerator.generateToken({ id });

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

      const user = await this.userDatabase.findUserByEmail(email);

      if (user === undefined) {
        throw new InvalidUser();
      }

      const isValidPass = await this.hashManager.compare(
        password,
        user.password
      );

      if (!isValidPass) {
        throw new InvalidUser();
      }

      const token = this.tokenGenerator.generateToken({ id: user.id });

      const result = { token, user };

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  async getAllUsers(token: string): Promise<User[] | string> {
    try {
      const authData = this.tokenGenerator.getData(token);

      if (!authData.id) {
        throw new InvalidAuthData();
      }

      const result = await this.userDatabase.getAllUsers();
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
