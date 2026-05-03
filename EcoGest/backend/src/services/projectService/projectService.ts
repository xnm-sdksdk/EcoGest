import { Project } from "../../entity/projectEntity.js";
import { CreateProjectDTO, UpdateProjectDTO } from "../../dto/projectDTO.js";

export interface ProjectService {
  createProject(createProjectDTO: CreateProjectDTO): Promise<Project>;

  findAllProjects(): Promise<Project[]>;

  findProjectById(projectId: number): Promise<Project | null>;

  removeProjectById(projectId: number): Promise<void | null>;

  updateProjectById(
    projectId: number,
    updateProjectDTO: UpdateProjectDTO,
  ): Promise<Project | null>;
}
