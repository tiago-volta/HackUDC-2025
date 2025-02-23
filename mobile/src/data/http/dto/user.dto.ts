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

export type UserProfileDTO = {
  evaluation: string;
  ocean: {
    neurocitismLevel: string;
    neurocistismDescription: string;
    extroversionLevel: string;
    extroversionDescription: string;
    openessLevel: string;
    openessDescription: string;
    agreeablenessLevel: string;
    agreeablenessDescription: string;
    conscientiousnessLevel: string;
    conscientiousnessDescription: string;
  };
  eneagrama: {
    type: string;
    description: string;
  };
};
