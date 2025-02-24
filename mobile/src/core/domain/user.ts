import { JSX } from "react";
import { Role } from "../../@types/role";

export type User = {
  email: string;
  role: Role;
  completeName: string;
  birthDate: Date;
  occupation: string;
  nationality: string;
  dateOfCreation: Date;
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

export type UserProfile = {
  evaluation: string;
  ocean: {
    openness: {
      label: string;
      value: number;
      description: string;
    };
    conscientiousness: {
      label: string;
      value: number;
      description: string;
    };
    extroversion: {
      label: string;
      value: number;
      description: string;
    };
    agreeableness: {
      label: string;
      value: number;
      description: string;
    };
    neuroticism: {
      label: string;
      value: number;
      description: string;
    };
  };
  eneagrama: {
    type: string;
    description: string;
  };
};
