import { api } from "./axios.client";
import { JwtTokenValueDto } from "./dto/token.dto";
import { UserAuthRequestDTO, UserDTO } from "./dto/user.dto";

class AuthApi {
  register = async (dto: UserAuthRequestDTO): Promise<void> => {
    await api.post<JwtTokenValueDto>("auth/register", dto);
  };

  login = async (dto: UserAuthRequestDTO): Promise<JwtTokenValueDto> => {
    const response = await api.post<JwtTokenValueDto>("auth/login", dto);
    return response.data;
  };

  getUserInfo = async (): Promise<UserDTO> => {
    const response = await api.get<UserDTO>("auth/me");
    return response.data;
  };
}

const authApi = new AuthApi();
export { authApi };
