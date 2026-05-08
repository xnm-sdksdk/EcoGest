import type { Request, Response } from "express";
import type { ProceedingsService } from "../services/proceedingsService/proceedingsService.js";
import { ProceedingsServiceImpl } from "../services/proceedingsService/impl/proceedingsServiceImpl.js";
import {
  CreateProceedingsDTO,
  ProceedingsDTO,
  UpdateProceedingsDTO,
} from "../dto/proceedingsDTO.js";
import { logger } from "../utils/logger/logger.js";

export class ProceedingsController {
  private readonly proceedingsService: ProceedingsService;

  constructor() {
    this.proceedingsService = new ProceedingsServiceImpl();
  }

  getProceedingByMeetingId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const proceeding =
        await this.proceedingsService.findProceedingByMeetingId(meetingId);

      if (!proceeding) {
        res.status(404).json({ error: "Proceedings not found" });
        return;
      }

      const proceedingDTO: ProceedingsDTO = {
        id: proceeding.id,
        content: proceeding.content,
        createdBy: proceeding.createdBy.id,
        meetingId: proceeding.meeting.id,
        updatedAt: proceeding.updatedAt,
      };

      res.status(200).json(proceedingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get proceedings by meeting id");
      res.status(500).json({ error: error.message });
    }
  };

  addProceedingToMeeting = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const data: CreateProceedingsDTO = req.body;

      if (!data.content || !data.createdBy) {
        res.status(400).json({
          error: "Missing required fields: content, createdBy",
        });
        return;
      }

      const proceeding = await this.proceedingsService.addProceedingToMeeting(
        meetingId,
        data,
      );

      const proceedingDTO: ProceedingsDTO = {
        id: proceeding.id,
        content: proceeding.content,
        createdBy: proceeding.createdBy.id,
        meetingId: proceeding.meeting.id,
        updatedAt: proceeding.updatedAt,
      };

      logger.info({ proceedingId: proceeding.id, meetingId }, "Proceedings created");
      res.status(201).json(proceedingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create proceedings");
      res.status(500).json({ error: error.message });
    }
  };

  updateProceedingById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const proceedingId = Number(req.params.id);

      if (Number.isNaN(proceedingId) || proceedingId <= 0) {
        res.status(400).json({ error: "Invalid Proceedings ID" });
        return;
      }

      const data: UpdateProceedingsDTO = req.body;

      const updatedProceeding =
        await this.proceedingsService.updateProceedingById(
          proceedingId,
          data,
        );

      if (!updatedProceeding) {
        res.status(404).json({ error: "Proceedings not found" });
        return;
      }

      const proceedingDTO: ProceedingsDTO = {
        id: updatedProceeding.id,
        content: updatedProceeding.content,
        createdBy: updatedProceeding.createdBy.id,
        meetingId: updatedProceeding.meeting.id,
        updatedAt: updatedProceeding.updatedAt,
      };

      logger.info({ proceedingId }, "Proceedings updated");
      res.status(200).json(proceedingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to update proceedings");
      res.status(500).json({ error: error.message });
    }
  };
}