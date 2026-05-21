import { UserProfile } from "../entity/userEntity.js";

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: UserProfile;
  active?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}
