import type { Request, Response } from "express";
import { ProjectServiceImpl } from "../services/projectService/impl/projectServiceImpl.js";
import type { ProjectService } from "../services/projectService/projectService.js";
import { ProjectDTO } from "../dto/projectDTO.js";
import { logger } from "../utils/logger/logger.js";

export class ProjectController {
  private readonly projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectServiceImpl();
  }

  createProject = async (res: Response, res: Response): Promise<void> => {};

  getAllProjects = async (_req: Request, res: Response): Promise<void> => {
    try {
      const projects = await this.projectService.findAllProjects();
      const projectsDTOs: ProjectDTO[] = projects.map((project) => ({
        id: project.id,
        name: project.name,
        school: project.school,
        schoolYear: new Date().toISOString(),
        state: project.state,
      }));
      res.status(200).json(projectsDTOs);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all projects");
      res.status(500).json({ error: error.message });
    }
  };

  getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = Number(req.params.id);
      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const project = await this.projectService.findProjectById(projectId);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      const projectDTO: ProjectDTO = {
        id: project.id,
        name: project.name,
        school: project.school,
        schoolYear: project.schoolYear,
        state: project.state,
      };

      res.status(200).json(projectDTO);
    } catch (error: any) {
      logger.error(
        { err: error, projectId: req.params.id },
        "Failed to get project by id.",
      );
      res.status(500).json({ error: error.message });
    }
  };

  updateProjectById = async (res: Response, res: Response): Promise<void> => {};

  removeProjectById = async (res: Response, res: Response): Promise<void> => {};
}
