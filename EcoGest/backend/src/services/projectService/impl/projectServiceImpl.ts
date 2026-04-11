import { ProjectDTO } from "../../../dto/projectDTO.js";
import { Project } from "../../../entity/projectEntity.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import type { ProjectService } from "../projectService.js";

export class ProjectServiceImpl implements ProjectService {
    private projectRepository: typeof ProjectRepository;

    constructor() {
        this.projectRepository = ProjectRepository;
    }

    createProject(projectDTO: ProjectDTO): Promise<Project> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }
    findProjectById(projectId: number): Promise<Project | null> {
        if (!projectId) {
            throw new Error("Project ID not found.");
        }
        return this.projectRepository.findOneBy({ id: projectId });
    }
    removeProjectById(projectId: number): Promise<void> {
        if (!projectId) {
            throw new Error("Project ID not found.");
        }
        return this.projectRepository.delete(projectId).then(() => { });
    }
    updateProjectById(projectDTO: ProjectDTO): Promise<Project> {
        throw new Error("Method not implemented.");
    }
}
