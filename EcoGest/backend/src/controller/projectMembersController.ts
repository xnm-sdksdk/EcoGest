import type { Request, Response } from "express";
import { ProjectMemberService } from "../services/projectMembersService/projectMembersService.js";
import { ProjectMemberServiceImpl } from "../services/projectMembersService/impl/projectMembersServiceImpl.js";
import { ProjectMemberDTO } from "../dto/projectMembersDTO.js";
import { logger } from "../utils/logger/logger.js";

export class ProjectMemberController {
  private readonly projectMemberService: ProjectMemberService;

  constructor() {
    this.projectMemberService = new ProjectMemberServiceImpl();
  }

  getProjectMembers = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const members =
        await this.projectMemberService.findProjectMembers(projectId);

      res.status(200).json(members);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get project members");
      res.status(500).json({ error: error.message });
    }
  };

  addProjectMember = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const data: ProjectMemberDTO = req.body;

      if (!data.userId) {
        res.status(400).json({ error: "Missing required field: userId" });
        return;
      }

      const member = await this.projectMemberService.addProjectMember(
        projectId,
        data,
      );

      res.status(201).json(member);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to add project member");
      res.status(500).json({ error: error.message });
    }
  };

  removeProjectMember = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.id);
      const userId = Number(req.params.userId);

      if (
        Number.isNaN(projectId) ||
        projectId <= 0 ||
        Number.isNaN(userId) ||
        userId <= 0
      ) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      await this.projectMemberService.removeProjectMember(
        projectId,
        userId,
      );

      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to remove project member");
      res.status(500).json({ error: error.message });
    }
  };
}