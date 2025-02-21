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
    };
  }

  static toDTO(domain: User): UserDTO {
    return {
      login: domain.email,
      role: domain.role,
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
      role: domain.role.toLocaleLowerCase(),
    };
  }
}
