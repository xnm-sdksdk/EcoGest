import { User } from "../../entity/userEntity.js";
import { ProjectMemberDTO } from "../../dto/projectMembersDTO.js";

export interface ProjectMemberService {
  findProjectMembers(projectId: number): Promise<User[]>;

  addProjectMember(
    projectId: number,
    projectMemberDTO: ProjectMemberDTO,
  ): Promise<User>;

  removeProjectMember(
    projectId: number,
    userId: number,
  ): Promise<void>;
}