import type { Request, Response } from "express";
import { ProjectServiceImpl } from "../services/projectService/impl/projectServiceImpl.js";
import type { ProjectService } from "../services/projectService/projectService.js";
import {
  CreateProjectDTO,
  ProjectDTO,
  UpdateProjectDTO,
} from "../dto/projectDTO.js";
import { logger } from "../utils/logger/logger.js";

export class ProjectController {
  private readonly projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectServiceImpl();
  }

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateProjectDTO = req.body;
      if (!data.name || !data.school || !data.schoolYear || !data.state) {
        res.status(400).json({
          error: "Missing required fields: name, school, schoolYear, state",
        });
        return;
      }

      const project = await this.projectService.createProject(data);

      const projectDTO: ProjectDTO = {
        id: project.id,
        name: project.name,
        school: project.school,
        schoolYear: project.schoolYear,
        state: project.state,
      };

      logger.info({ projectId: project.id }, "Project created");
      res.status(201).json(projectDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create project");
      res.status(500).json({ error: error.message });
    }
  };

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

  updateProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = Number(req.params.id);
      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const data: UpdateProjectDTO = req.body;

      const updatedProject = await this.projectService.updateProjectById(
        projectId,
        data,
      );

      if (!updatedProject) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      const projectDTO: ProjectDTO = {
        id: updatedProject.id,
        name: updatedProject.name,
        school: updatedProject.school,
        schoolYear: updatedProject.schoolYear,
        state: updatedProject.state,
      };

      logger.info({ projectId }, "Project updated");
      res.status(200).json(projectDTO);
    } catch (error: any) {
      logger.error(
        { err: error, projectId: req.params.id },
        "Failed to update project",
      );
      res.status(500).json({ error: error.message });
    }
  };

  deleteProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = Number(req.params.id);
      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }
      await this.projectService.removeProjectById(projectId);
      logger.info({ projectId }, "Project deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete project");
      res.status(500).json({ error: error.message });
    }
  };
}
