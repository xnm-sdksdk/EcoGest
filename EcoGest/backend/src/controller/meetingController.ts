import type { Request, Response } from "express";
import { MeetingService } from "../services/meetingService/meetingService.js";
import { MeetingServiceImpl } from "../services/meetingService/impl/meetingServiceImpl.js";
import { CreateMeetingDTO, MeetingDTO, UpdateMeetingDTO } from "../dto/meetingDTO.js";
import { logger } from "../utils/logger/logger.js";
import { AuthenticatedRequest } from "../dto/authDTO.js";

export class MeetingController {
  private readonly meetingService: MeetingService;

  constructor() {
    this.meetingService = new MeetingServiceImpl();
  }

  getProjectMeetings = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const meetings =
        await this.meetingService.findMeetingsByProjectId(projectId);

      const meetingsDTO: MeetingDTO[] = meetings.map((meeting) => ({
        id: meeting.id,
        title: meeting.title,
        date: meeting.date,
        location: meeting.location,
        workOrder: meeting.workOrder,
        state: meeting.state,
        createdBy: meeting.createdBy.id,
        updatedAt: meeting.updatedAt,
      }));

      res.status(200).json(meetingsDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get project meetings");
      res.status(500).json({ error: error.message });
    }
  };

  getMeetingById = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const meeting = await this.meetingService.findMeetingById(meetingId);

      if (!meeting) {
        res.status(404).json({ error: "Meeting not found" });
        return;
      }

      const meetingDTO: MeetingDTO = {
        id: meeting.id,
        title: meeting.title,
        date: meeting.date,
        location: meeting.location,
        workOrder: meeting.workOrder,
        state: meeting.state,
        createdBy: meeting.createdBy.id,
        updatedAt: meeting.updatedAt,
      };

      res.status(200).json(meetingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get meeting by id");
      res.status(500).json({ error: error.message });
    }
  };

  createMeeting = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const data: CreateMeetingDTO = req.body;

      if (!data.date || !data.location) {
        res.status(400).json({
          error: "Missing required fields: date, location",
        });
        return;
      }
      const createdBy = req.user!.id;
      const meeting = await this.meetingService.createMeeting(
        projectId,
        data,
        createdBy,
      );

      const meetingDTO: MeetingDTO = {
        id: meeting.id,
        title: meeting.title,
        date: meeting.date,
        location: meeting.location,
        workOrder: meeting.workOrder,
        state: meeting.state,
        createdBy: meeting.createdBy.id,
        updatedAt: meeting.updatedAt,
      };

      logger.info({ meetingId: meeting.id }, "Meeting created");
      res.status(201).json(meetingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create meeting");
      res.status(500).json({ error: error.message });
    }
  };

  updateMeetingById = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const data: UpdateMeetingDTO = req.body;

      const updatedMeeting = await this.meetingService.updateMeetingById(
        meetingId,
        data,
      );

      if (!updatedMeeting) {
        res.status(404).json({ error: "Meeting not found" });
        return;
      }

      const meetingDTO: MeetingDTO = {
        id: updatedMeeting.id,
        title: updatedMeeting.title,
        date: updatedMeeting.date,
        location: updatedMeeting.location,
        workOrder: updatedMeeting.workOrder,
        state: updatedMeeting.state,
        createdBy: updatedMeeting.createdBy?.id,
        updatedAt: updatedMeeting.updatedAt,
      };

      logger.info({ meetingId }, "Meeting updated");
      res.status(200).json(meetingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to update meeting");
      res.status(500).json({ error: error.message });
    }
  };

  deleteMeetingById = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      await this.meetingService.deleteMeetingById(meetingId);

      logger.info({ meetingId }, "Meeting deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete meeting");
      res.status(500).json({ error: error.message });
    }
  };

  cancelMeetingById = async (req: Request, res: Response): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const meeting = await this.meetingService.cancelMeetingById(meetingId);

      if (!meeting) {
        res.status(404).json({ error: "Meeting not found" });
        return;
      }

      const meetingDTO: MeetingDTO = {
        id: meeting.id,
        title: meeting.title,
        date: meeting.date,
        location: meeting.location,
        workOrder: meeting.workOrder,
        state: meeting.state,
        createdBy: meeting.createdBy.id,
        updatedAt: meeting.updatedAt,
      };

      logger.info({ meetingId }, "Meeting canceled");
      res.status(200).json(meetingDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to cancel meeting");
      res.status(500).json({ error: error.message });
    }
  };
}
