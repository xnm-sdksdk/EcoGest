import { ProjectMemberService } from "../projectMembersService.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { User } from "../../../entity/userEntity.js";
import { ProjectMemberDTO } from "../../../dto/projectMembersDTO.js";
import { logger } from "../../../utils/logger/logger.js";

export class ProjectMemberServiceImpl implements ProjectMemberService {
  private readonly projectRepository: typeof ProjectRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.projectRepository = ProjectRepository;
    this.userRepository = UserRepository;
  }

  async findProjectMembers(projectId: number): Promise<User[]> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        members: true,
      },
    });

    if (!project) {
      logger.warn({ projectId }, "Project not found.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    return project.members;
  }

  async addProjectMember(
    projectId: number,
    projectMemberDTO: ProjectMemberDTO,
  ): Promise<User> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        members: true,
      },
    });

    if (!project) {
      throw new Error(`Project with id ${projectId} not found.`);
    }

    const user = await this.userRepository.findOneBy({
      id: projectMemberDTO.userId,
    });

    if (!user) {
      throw new Error(`User with id ${projectMemberDTO.userId} not found.`);
    }

    project.members.push(user);

    await this.projectRepository.save(project);

    return user;
  }

  async removeProjectMember(
    projectId: number,
    userId: number,
  ): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        members: true,
      },
    });

    if (!project) {
      throw new Error(`Project with id ${projectId} not found.`);
    }

    project.members = project.members.filter(
      (member) => member.id !== userId,
    );

    await this.projectRepository.save(project);
  }
}