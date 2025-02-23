import { Role } from "../../@types/role";
import {
  User,
  UserAuthRequest,
  UserProfile,
  UserRegisterRequest,
} from "../../core/domain/user";
import {
  UserAuthRequestDTO,
  UserDTO,
  UserProfileDTO,
  UserRegisterRequestDTO,
} from "../http/dto/user.dto";

export class UserMapper {
  static toDomain(dto: UserDTO): User {
    return {
      email: dto.login,
      role: dto.role as Role,
      completeName: dto.completeName,
      birthDate: new Date(dto.birthDate),
      occupation: dto.occupation,
      nationality: dto.nacionality,
    };
  }

  static toDTO(domain: User): UserDTO {
    return {
      login: domain.email,
      role: domain.role,
      completeName: domain.completeName,
      birthDate: domain.birthDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
      occupation: domain.occupation,
      nacionality: domain.nationality,
    };
  }
}

export class UserAuthRequestMapper {
  static toDTO(domain: UserAuthRequest): UserAuthRequestDTO {
    return {
      login: domain.email,
      password: domain.password,
    };
  }
}

export class UserRegisterRequestMapper {
  static toDTO(domain: UserRegisterRequest): UserRegisterRequestDTO {
    return {
      login: domain.email,
      password: domain.password,
      role: domain.role.toLowerCase(),
      completeName: domain.completeName,
      birthDate: domain.birthDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
      occupation: domain.occupation,
      nacionality: domain.nationality,
    };
  }
}

export class UserProfileMapper {
  static toDomain(dto: UserProfileDTO): UserProfile {
    return {
      evaluation: dto.evaluation,
      ocean: {
        openness: {
          label: "Openness",
          value: parseInt(dto.ocean.openessLevel),
          description: dto.ocean.openessDescription,
        },
        conscientiousness: {
          label: "Responsibility",
          value: parseInt(dto.ocean.conscientiousnessLevel),
          description: dto.ocean.conscientiousnessDescription,
        },
        extroversion: {
          label: "Extroversion",
          value: parseInt(dto.ocean.extroversionLevel),
          description: dto.ocean.extroversionDescription,
        },
        agreeableness: {
          label: "Agreeableness",
          value: parseInt(dto.ocean.agreeablenessLevel),
          description: dto.ocean.agreeablenessDescription,
        },
        neuroticism: {
          label: "Neuroticism",
          value: parseInt(dto.ocean.neurocitismLevel),
          description: dto.ocean.neurocistismDescription,
        },
      },
      eneagrama: {
        type: dto.eneagrama.type,
        description: dto.eneagrama.description,
      },
    };
  }
}
