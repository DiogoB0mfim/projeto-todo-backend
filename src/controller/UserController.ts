import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDTO, UserLogin } from "../models/User";

export class UserController {
  constructor(
    private userBusiness : UserBusiness
  ){};

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;

      const newUser: UserDTO = {
        firstName,
        lastName,
        email,
        password,
      };

      const token = await this.userBusiness.signUp(newUser);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const userLogin: UserLogin = {
        email,
        password,
      };

      const result = await this.userBusiness.login(userLogin);

      res.status(200).send({ result: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;

      const result = await this.userBusiness.getAllUsers(token);
      res.status(200).send({ result: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
