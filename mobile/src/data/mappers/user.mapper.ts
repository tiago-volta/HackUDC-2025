import { Role } from "../../@types/role";
import {
  User,
  UserAuthRequest,
  UserRegisterRequest,
} from "../../core/domain/user";
import {
  UserAuthRequestDTO,
  UserDTO,
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
