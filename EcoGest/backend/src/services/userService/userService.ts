import { UserDTO } from "../../dto/userDTO.js";
import { User } from "../../entity/userEntity.js";

export interface UserService {
    findAll(): Promise<User[]>;

    findUserById(projectId: number): Promise<User | null>;

    deleteUserById(projectId: number): Promise<void>;

    updateUserById(projectDTO: UserDTO): Promise<User>;
}
