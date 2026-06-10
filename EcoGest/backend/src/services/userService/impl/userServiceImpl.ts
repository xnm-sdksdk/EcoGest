import { UserService } from "../userService.js";
import { User } from "../../../entity/userEntity.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { UpdateUserDTO } from "../../../dto/userDTO.js";
import { logger } from "../../../utils/logger/logger.js";

export class UserServiceImpl implements UserService {
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.userRepository = UserRepository;
  }

  async removeUserById(userId: number): Promise<void> {
    if (!userId) {
      logger.warn({ userId }, "Invalid user ID");
      throw new Error("User not found");
    }
    return await this.userRepository.delete(userId).then(() => {});
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<User | null> {
    if (!userId || userId <= 0) {
      logger.warn({ userId }, "Invalid user ID");
      throw new Error("Invalid user ID.");
    }
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ["projects", "activities"],
    });
  }

  async updateUserById(
    userId: number,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      logger.warn({ userId }, "User not found.");
      return null;
    }

    Object.assign(user, updateUserDTO);
    return await this.userRepository.save(user);
  }
}
