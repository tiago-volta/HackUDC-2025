import { JwtTokenValue } from "../../@types/jwt-token";
import { authApi } from "../../data/http/auth.api";
import { JwtTokenValueMapper } from "../../data/mappers/token.mapper";
import {
  UserAuthRequestMapper,
  UserMapper,
  UserRegisterRequestMapper,
} from "../../data/mappers/user.mapper";
import { User, UserAuthRequest, UserRegisterRequest } from "../domain/user";

class AuthService {
  private currentUser: User | null = null;

  async initialize(): Promise<User | null> {
    try {
      const user = await this.getUserInfo();
      if (!user) return null;
      this.currentUser = user;
      return this.currentUser;
    } catch (error) {
      console.error("[AuthService] Failed to initialize:", error);
      return null;
    }
  }

  async register(data: UserRegisterRequest): Promise<boolean> {
    try {
      const dto = UserRegisterRequestMapper.toDTO(data);
      console.log("Logging DTO in register method");
      console.log({ dto });
      await authApi.register(dto);
    } catch {
      return false;
    }
    return true;
  }

  async login(data: UserAuthRequest): Promise<JwtTokenValue> {
    const dto = UserAuthRequestMapper.toDTO(data);
    const res = await authApi.login(dto);
    const jwtTokenValue = JwtTokenValueMapper.getJwtTokenValue(res);
    return jwtTokenValue;
  }

  logout() {
    this.currentUser = null;
  }

  async getUserInfo(): Promise<User> {
    const res = await authApi.getUserInfo();
    const user = UserMapper.toDomain(res);
    return user;
  }
}

export const authService = new AuthService();
