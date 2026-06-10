import { CreateProjectDTO, UpdateProjectDTO } from "../../../dto/projectDTO.js";
import { Project } from "../../../entity/projectEntity.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { ProjectService } from "../projectService.js";
import { logger } from "../../../utils/logger/logger.js";
import { UserRepository } from "../../../repository/userRepository.js";

export class ProjectServiceImpl implements ProjectService {
  private readonly projectRepository: typeof ProjectRepository;
  private readonly userRepository: typeof UserRepository;
  constructor() {
    this.projectRepository = ProjectRepository;
    this.userRepository = UserRepository;
  }

  async createProject(
    createProjectDTO: CreateProjectDTO,
    userId: number,
  ): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDTO,
    });

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found.");

    project.members = [user];

    return await this.projectRepository.save(project);
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findProjectById(projectId: number): Promise<Project | null> {
    if (!projectId || projectId <= 0) {
      logger.warn({ projectId }, "Invalid Project ID.");
      throw new Error(`Invalid Project ID: ${projectId}`);
    }
    return await this.projectRepository.findOneBy({ id: projectId });
  }

  async removeProjectById(projectId: number): Promise<void> {
    if (!projectId) {
      logger.warn({ projectId }, "Invalid Project ID.");
      throw new Error("Project ID not found.");
    }
    return await this.projectRepository.delete(projectId).then(() => {});
  }

  async updateProjectById(
    projectId: number,
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<Project | null> {
    const project = await this.projectRepository.findOneBy({
      id: projectId,
    });
    if (!project) {
      logger.warn({ projectId }, "Project not found.");
      return null;
    }

    Object.assign(project, updateProjectDTO);
    return await this.projectRepository.save(project);
  }
}
