import { UserProfile } from "../entity/userEntity.js";

export interface ProjectUserDTO {
  id: number;
  name: string;
  schoolYear: string;
}

export interface ActivityUserDTO {
  id: number;
  name: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: UserProfile;
  active?: boolean;
  projects?: ProjectUserDTO[];
  activities?: ActivityUserDTO[];
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}
