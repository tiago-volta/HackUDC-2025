import { Role } from "../../@types/role";

export type User = {
  email: string;
  role: Role;
  // Add more user-related fields as needed
};

export type UserAuthRequest = {
  email: string;
  password: string;
};

export type UserRegisterRequest = {
  email: string;
  password: string;
  role: Role;
};
