import type { Request, Response } from "express";
import type { ConvocationService } from "../services/convocationService/convocationService.js";
import { ConvocationServiceImpl } from "../services/convocationService/impl/convocationServiceImpl.js";
import {
  ConvocationDTO,
  CreateConvocationDTO,
} from "../dto/convocationDTO.js";
import { logger } from "../utils/logger/logger.js";

export class ConvocationController {
  private readonly convocationService: ConvocationService;

  constructor() {
    this.convocationService = new ConvocationServiceImpl();
  }

  getMeetingConvocations = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const convocations =
        await this.convocationService.findConvocationByMeetingId(meetingId);

      const convocationsDTO: ConvocationDTO[] = convocations.map(
        (convocation) => ({
          id: convocation.id,
          sentAt: convocation.sentAt,
          state: convocation.state,
          attendance: convocation.attendance,
          meetingId: convocation.meeting.id,
          recipientId: convocation.recipient.id,
          createdBy: convocation.createdBy.id,
          updatedAt: convocation.updatedAt,
        }),
      );

      res.status(200).json(convocationsDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get meeting convocations");
      res.status(500).json({ error: error.message });
    }
  };

  createMeetingConvocation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const data: CreateConvocationDTO = req.body;

      if (!data.recipientId || !data.createdBy) {
        res.status(400).json({
          error: "Missing required fields: recipientId, createdBy",
        });
        return;
      }

      const convocation =
        await this.convocationService.createMeetingConvocation(meetingId, data);

      const convocationDTO: ConvocationDTO = {
        id: convocation.id,
        sentAt: convocation.sentAt,
        state: convocation.state,
        attendance: convocation.attendance,
        meetingId: convocation.meeting.id,
        recipientId: convocation.recipient.id,
        createdBy: convocation.createdBy.id,
        updatedAt: convocation.updatedAt,
      };

      logger.info({ convocationId: convocation.id }, "Convocation created");
      res.status(201).json(convocationDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create convocation");
      res.status(500).json({ error: error.message });
    }
  };

  resendMeetingConvocations = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const convocations =
        await this.convocationService.resendMeetingConvocations(meetingId);

      const convocationsDTO: ConvocationDTO[] = convocations.map(
        (convocation) => ({
          id: convocation.id,
          sentAt: convocation.sentAt,
          state: convocation.state,
          attendance: convocation.attendance,
          meetingId: convocation.meeting.id,
          recipientId: convocation.recipient.id,
          createdBy: convocation.createdBy.id,
          updatedAt: convocation.updatedAt,
        }),
      );

      logger.info({ meetingId }, "Meeting convocations resent");
      res.status(200).json(convocationsDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to resend convocations");
      res.status(500).json({ error: error.message });
    }
  };
}