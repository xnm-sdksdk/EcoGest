import { AuthService } from "../authService.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { AuthResponseDTO, LoginDTO } from "../../../dto/authDTO.js";
import { logger } from "../../../utils/logger/logger.js";
import config from "../../../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthServiceImpl implements AuthService {
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.userRepository = UserRepository;
  }

  async login(loginDTO: LoginDTO): Promise<AuthResponseDTO | null> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email: loginDTO.email })
      .getOne();

    if (!user) {
      logger.warn({ user }, "Invalid credentials");
      return null;
    }

    if (!user.active) {
      logger.warn({ user }, "Unable to login");
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!passwordMatch) {
      return null;
    }

    const token = jwt.sign(
      { id: user.id, profile: user.profile },
      config.jwtSecret,
      { expiresIn: "24h" },
    );

    logger.info({ userId: user.id }, "User logged in");

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    };
  }
}
