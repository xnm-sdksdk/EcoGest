import type { Request, Response } from "express";
import { LevelService } from "../services/levelService/levelService.js";
import { LevelServiceImpl } from "../services/levelService/impl/levelServiceImpl.js";
import { CreateLevelDTO, LevelDTO, UpdateLevelDTO } from "../dto/levelDTO.js";
import { logger } from "../utils/logger/logger.js";

export class LevelController {
  private readonly levelService: LevelService;

  constructor() {
    this.levelService = new LevelServiceImpl();
  }

  getAllLevels = async (_req: Request, res: Response): Promise<void> => {
    try {
      const levels = await this.levelService.findAllLevels();

      if (!levels) {
        res.status(404).json({ error: "Levels not found" });
        return;
      }

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

  createLevel = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: CreateLevelDTO = req.body;

      if (!data) {
        res.status(400).json({
          error:
            "Missing required fields: name, description, minAreas, minActivities, order",
        });
        return;
      }

      const level = await this.levelService.createLevel(data);

      const levelDTO: LevelDTO = {
        id: level.id,
        name: level.name,
        description: level.description,
        minActivities: level.minActivities,
        minAreas: level.minAreas,
        order: level.order,
      };
      logger.info({ levelId: level.id }, "Level created");
      res.status(201).json(levelDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create level");
      res.status(500).json({ error: error.message });
    }
  };

  updateLevelById = async (req: Request, res: Response): Promise<void> => {
    try {
      const levelId = Number(req.params.id);
      if (Number.isNaN(levelId) || levelId <= 0) {
        res.status(400).json({ error: "Invalid Level ID" });
        return;
      }

      const data: UpdateLevelDTO = req.body;

      const updateLevel = await this.levelService.updateLevelById(
        levelId,
        data,
      );

      if (!updateLevel) {
        res.status(404).json({ error: "Level not found" });
        return;
      }

      const levelDTO: LevelDTO = {
        id: updateLevel.id,
        name: updateLevel.name,
        description: updateLevel.description,
        minActivities: updateLevel.minActivities,
        minAreas: updateLevel.minAreas,
        order: updateLevel.order,
      };

      logger.info({ levelDTO }, "Level updated");
      res.status(200).json(levelDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to update levels");
      res.status(500).json({ error: error.message });
    }
  };

  deleteLevelById = async (req: Request, res: Response): Promise<void> => {
    try {
      const levelId = Number(req.params.id);
      if (Number.isNaN(levelId) || levelId <= 0) {
        res.status(400).json({ error: "Invalid Level ID" });
        return;
      }
      await this.levelService.removeLevelById(levelId);
      logger.info({ levelId }, "Level deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete level by id.");
      res.status(500).json({ error: error.message });
    }
  };

  getLevelByProjectId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {};

  updateLevelByProjectId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {};
}
