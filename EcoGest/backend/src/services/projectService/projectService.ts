import { Project } from "../../entity/projectEntity.js";
import { ProjectDTO } from "../../dto/projectDTO.js";

export interface ProjectService {
  createProject(projectDTO: ProjectDTO): Promise<Project>;

  findAllProjects(): Promise<Project[]>;

  findProjectById(projectId: number): Promise<Project | null>;

  removeProjectById(projectId: number): Promise<void>;

  updateProjectById(
    projectId: number,
    projectDTO: ProjectDTO,
  ): Promise<Project>;
}
