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
    } catch (error: any) {
      logger.error({ err: error }, "Error fetching ranking By Project Id");
      res.status(500).json({ error: error.message });
    }
  };

  getScoringByProjectId = async (req: Request, res: Response) => {};
}
