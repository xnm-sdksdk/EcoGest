import { UserService } from "../userService.js";
import { User } from "../../../entity/userEntity.js";
import { UserRepository } from "../../../repository/userRepository.js";


export class UserServiceImpl implements UserService {
  private userRepository: typeof UserRepository;
  constructor() {
    this.userRepository = UserRepository;
  }

  deleteUserById(userId: number): Promise<void> {
    return Promise.resolve(undefined);
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