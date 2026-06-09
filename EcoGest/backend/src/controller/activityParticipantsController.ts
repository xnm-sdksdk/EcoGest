import type { Request, Response } from "express";
import { ActivityParticipantService } from "../services/activityParticipantsService/activityParticipantsService.js";
import { ActivityParticipantServiceImpl } from "../services/activityParticipantsService/impl/activityParticipantsServiceImpl.js";
import { ActivityParticipantDTO } from "../dto/activityParticipantsDTO.js";
import { logger } from "../utils/logger/logger.js";

export class ActivityParticipantController {
  private readonly activityParticipantService: ActivityParticipantService;

  constructor() {
    this.activityParticipantService =
      new ActivityParticipantServiceImpl();
  }

  getActivityParticipants = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const activityId = Number(req.params.id);

      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const participants =
        await this.activityParticipantService.findActivityParticipants(
          activityId,
        );

      res.status(200).json(participants);
    } catch (error: any) {
      logger.error(
        { err: error },
        "Failed to get activity participants",
      );
      res.status(500).json({ error: error.message });
    }
  };

  addActivityParticipant = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const activityId = Number(req.params.id);

      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const data: ActivityParticipantDTO = req.body;

      if (!data.userId) {
        res.status(400).json({
          error: "Missing required field: userId",
        });
        return;
      }

      const participant =
        await this.activityParticipantService.addActivityParticipant(
          activityId,
          data,
        );

      res.status(201).json(participant);
    } catch (error: any) {
      logger.error(
        { err: error },
        "Failed to add activity participant",
      );
      res.status(500).json({ error: error.message });
    }
  };

  removeActivityParticipant = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const activityId = Number(req.params.id);
      const userId = Number(req.params.userId);

      if (
        Number.isNaN(activityId) ||
        activityId <= 0 ||
        Number.isNaN(userId) ||
        userId <= 0
      ) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      await this.activityParticipantService.removeActivityParticipant(
        activityId,
        userId,
      );

      res.status(204).send();
    } catch (error: any) {
      logger.error(
        { err: error },
        "Failed to remove activity participant",
      );
      res.status(500).json({ error: error.message });
    }
  };
}