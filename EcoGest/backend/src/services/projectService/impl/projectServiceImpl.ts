import { ProjectDTO } from "../../../dto/projectDTO.js";
import { Project } from "../../../entity/projectEntity.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { ProjectService } from "../projectService.js";
import { logger } from "../../../utils/logger/logger.js";

export class ProjectServiceImpl implements ProjectService {
  private readonly projectRepository: typeof ProjectRepository;

  constructor() {
    this.projectRepository = ProjectRepository;
  }

  async createProject(projectDTO: ProjectDTO): Promise<Project> {
    const project = this.projectRepository.create({
      ...projectDTO,
    });
    if (!project) {
      throw new Error("Error creating project.");
    }
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
    projectDTO: ProjectDTO,
  ): Promise<Project> {
    if (!projectId) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error("Project ID not found.");
    }
    await this.projectRepository.update(projectId, projectDTO);

    const updated = await this.projectRepository.findOneBy({ id: projectId });
    if (!updated) {
      logger.warn({ projectId }, "Project ID not found.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    return updated;
  }
}
