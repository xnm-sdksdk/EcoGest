import { User } from "../../entity/userEntity.js";
import { UpdateUserDTO } from "../../dto/userDTO.js";

export interface UserService {
  findAll(): Promise<User[]>;

  findUserById(userId: number): Promise<User | null>;

  removeUserById(userId: number): Promise<void | null>;

  updateUserById(
    userId: number,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User | null>;
}
