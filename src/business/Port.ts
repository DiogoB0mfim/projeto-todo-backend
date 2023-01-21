import { AuthenticationData } from "../models/User";

export interface IHashManager {
  hash(s: string): Promise<any>;
  compare(s: string, hash: string): Promise<boolean>;
}

export interface IIdGenerator {
  generate(): string;
}

export interface ITokenGenerator {
  generateToken(input: AuthenticationData): string;
  getData(token: string): AuthenticationData;
}