import { UserRole } from "../entity/userEntity.js";

export interface UserDTO {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: UserRole;
    active?: boolean;
}