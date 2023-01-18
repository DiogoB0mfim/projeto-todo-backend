export type AuthenticationData = {
  id: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserLogin = {
  email: string;
  password: string;
};
