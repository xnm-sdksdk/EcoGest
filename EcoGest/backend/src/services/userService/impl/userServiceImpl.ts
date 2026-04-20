import { UserService } from "../userService.js";
import { User } from "../../../entity/userEntity.js";
import { UserRepository } from "../../../repository/userRepository.js";
import {UserDTO} from "../../../dto/userDTO.js";


export class UserServiceImpl implements UserService {
  private userRepository: typeof UserRepository;

  constructor() {
    this.userRepository = UserRepository;
  }

  async removeUserById(userId: number): Promise<void> {
    if (!userId) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(userId);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  findUserById(userId: number): Promise<User | null> {
    return Promise.resolve(undefined);
  }

  updateUserById(userId: number, userDTO: UserDTO): Promise<User> {
    return Promise.resolve(undefined);
  }
}