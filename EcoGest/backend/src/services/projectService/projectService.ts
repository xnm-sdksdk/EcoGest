import { ProjectDTO } from "../../dto/projectDTO.js";
import { Project } from "../../entity/projectEntity.js";

export interface ProjectService {
    createProject(projectDTO: ProjectDTO): Promise<Project>;

    findAll(): Promise<Project[]>;

    findProjectById(projectId: number): Promise<Project | null>;

    removeProjectById(projectId: number): Promise<void>;

    updateProjectById(projectDTO: ProjectDTO): Promise<Project>;
}
