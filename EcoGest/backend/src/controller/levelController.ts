import type { Request, Response } from "express";
import { LevelService } from "../services/levelService/levelService.js";
import { LevelServiceImpl } from "../services/levelService/impl/levelServiceImpl.js";
import { LevelDTO } from "../dto/levelDTO.js";
import { logger } from "../utils/logger/logger.js";

export class LevelController {
  private readonly levelService: LevelService;

  constructor() {
    this.levelService = new LevelServiceImpl();
  }

  getAllLevels = async (_req: Request, res: Response): Promise<void> => {
    try {
      const levels = await this.levelService.findAllLevels();
      const levelDTOs: LevelDTO[] = levels.map((level) => ({
        id: level.id,
        name: level.name,
        description: level.description,
        minActivities: level.minActivities,
        minAreas: level.minAreas,
        order: level.order,
      }));

      res.status(200).json(levelDTOs);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to fetch levels");
      res.status(500).json({ error: error.message });
    }
  };

  getLevelById = async (req: Request, res: Response): Promise<void> => {
    try {
      const levelId = Number(req.params.id);
      if (Number.isNaN(levelId) || levelId <= 0) {
        res.status(400).json({ error: "Invalid Level ID" });
        return;
      }
      const level = await this.levelService.findLevelById(levelId);
      if (!level) {
        res.status(404).json({ error: "Level not found" });
        return;
      }
      const levelDTO: LevelDTO = {
        id: level.id,
        name: level.name,
        description: level.description,
        minActivities: level.minActivities,
        minAreas: level.minAreas,
        order: level.order,
      };

      res.status(200).json(levelDTO);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
