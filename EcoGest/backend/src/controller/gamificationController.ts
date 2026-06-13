import type { Request, Response } from "express";
import { logger } from "../utils/logger/logger.js";
import { GamificationServiceImpl } from "../services/gamificationService/impl/gamificationServiceImpl.js";
import { GamificationService } from "../services/gamificationService/gamificationService.js";

export class GamificationController {
  private readonly gamificationService: GamificationService;

  constructor() {
    this.gamificationService = new GamificationServiceImpl();
  }

  getRankingByProjectId = async (req: Request, res: Response) => {
    try {
      const projectId = Number(req.params.projectId);
      const ranking =
        await this.gamificationService.findRankingByProjectId(projectId);
      res.status(200).json(ranking);
    } catch (error: any) {
      logger.error({ err: error }, "Error fetching ranking by projectId");
      res.status(500).json({ error: error.message });
    }
  };

  getScoringByProjectId = async (req: Request, res: Response) => {
    try {
      const projectId = Number(req.params.projectId);
      const scoring =
        await this.gamificationService.findScoringByProjectId(projectId);
      res.status(200).json(scoring);
    } catch (error: any) {
      logger.error({ err: error }, "Error fetching scoring by projectId");
      res.status(500).json({ error: error.message });
    }
  };
}
