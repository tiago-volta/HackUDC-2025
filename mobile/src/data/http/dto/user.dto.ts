export type UserDTO = {
  login: string;
  role: string;
  completeName: string;
  birthDate: string; // format: yyyy-MM-dd
  occupation: string;
  nacionality: string;
};

export type UserAuthRequestDTO = {
  login: string;
  password: string;
};

export type UserRegisterRequestDTO = {
  login: string;
  password: string;
  role: string;
  nacionality: string;
  completeName: string;
  birthDate: string; // format: yyyy-MM-dd
  occupation: string;
};
