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
      completeName: dto.complete_name,
      birthDate: new Date(dto.birth_date),
      occupation: dto.occupation,
      nationality: dto.nationality,
    };
  }

  static toDTO(domain: User): UserDTO {
    return {
      login: domain.email,
      role: domain.role,
      complete_name: domain.completeName,
      birth_date: domain.birthDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
      occupation: domain.occupation,
      nationality: domain.nationality,
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
      complete_name: domain.completeName,
      birth_date: domain.birthDate.toISOString().split("T")[0], // Convert to YYYY-MM-DD
      occupation: domain.occupation,
      nationality: domain.nationality,
    };
  }
}
