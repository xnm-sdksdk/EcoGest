import { User } from "../../entity/userEntity.js";
import { UserDTO } from "../../dto/userDTO.js";

export interface UserService {
    findAll(): Promise<User[]>;

    findUserById(userId: number): Promise<User | null>;

    deleteUserById(userId: number): Promise<void>;

    updateUserById(userId: number, userDTO: UserDTO): Promise<User>;
}
