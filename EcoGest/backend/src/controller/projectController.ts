import type { Request, Response } from "express";
import { ProjectServiceImpl } from "../services/projectService/impl/projectServiceImpl.js";
import type { ProjectService } from "../services/projectService/projectService.js";
import { ProjectDTO } from "../dto/projectDTO.js";

export class ProjectController {
    private projectService: ProjectService;

    constructor() {
        this.projectService = new ProjectServiceImpl();
    }

    getAllProjects = async (_req: Request, res: Response): Promise<void> => {
        try {
            const projects = await this.projectService.findAllProjects();
            res.status(200).json(projects);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    getProjectById = (): Promise<ProjectDTO> => {

    }
}
