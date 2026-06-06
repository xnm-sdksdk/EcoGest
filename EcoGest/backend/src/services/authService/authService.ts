import { AuthResponseDTO, LoginDTO } from "../../dto/authDTO.js";

export interface AuthService {
  login(loginDTO: LoginDTO): Promise<AuthResponseDTO | null>;
}
