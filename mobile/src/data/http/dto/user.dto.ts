export type UserDTO = {
  login: string;
  role: string;
  complete_name: string;
  birth_date: string; // format: yyyy-MM-dd
  occupation: string;
  nationality: string;
};

export type UserAuthRequestDTO = {
  login: string;
  password: string;
};

export type UserRegisterRequestDTO = {
  login: string;
  password: string;
  role: string;
  complete_name: string;
  birth_date: string; // format: yyyy-MM-dd
  occupation: string;
  nationality: string;
};
