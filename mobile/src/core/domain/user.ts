import { Role } from "../../@types/role";

export type User = {
  email: string;
  role: Role;
  completeName: string;
  birthDate: Date;
  occupation: string;
  nationality: string;
};

export type UserAuthRequest = {
  email: string;
  password: string;
};

export type UserRegisterRequest = {
  email: string;
  password: string;
  role: Role;
  completeName: string;
  birthDate: Date;
  occupation: string;
  nationality: string;
};
