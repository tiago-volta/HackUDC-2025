export type UserDTO = {
  login: string;
  role: string;
};

export type UserAuthRequestDTO = {
  login: string;
  password: string;
};

export type UserRegisterRequestDTO = {
  login: string;
  password: string;
  role: string;
};
