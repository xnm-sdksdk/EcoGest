import type { Request, Response } from "express";
import { PhotoServiceImpl } from "../services/photoService/impl/photoServiceImpl.js";
import type { PhotoService } from "../services/photoService/photoService.js";
import {
  PhotoDTO,
  CreatePhotoDTO,
} from "../dto/photoDTO.js";
import { logger } from "../utils/logger/logger.js";

export class PhotoController {
  private readonly photoService: PhotoService;

  constructor() {
    this.photoService = new PhotoServiceImpl();
  }

  getPhotosByExecutionId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const executionId = Number(req.params.id);

      if (Number.isNaN(executionId) || executionId <= 0) {
        res.status(400).json({ error: "Invalid Execution ID" });
        return;
      }

      const photos =
        await this.photoService.findPhotosByExecution(executionId);

      const photosDTO: PhotoDTO[] = photos.map((photo) => ({
        id: photo.id,
        path: photo.path,
        executionId: photo.execution?.id,
        meetingId: photo.meeting?.id,
      }));

      res.status(200).json(photosDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get execution photos");
      res.status(500).json({ error: error.message });
    }
  };

  addPhotosToExecution = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const executionId = Number(req.params.id);

      if (Number.isNaN(executionId) || executionId <= 0) {
        res.status(400).json({ error: "Invalid Execution ID" });
        return;
      }

      const data: CreatePhotoDTO[] = req.body;

      const photos = await this.photoService.addPhotosToExecution(
        executionId,
        data,
      );

      const photosDTO: PhotoDTO[] = photos.map((photo) => ({
        id: photo.id,
        path: photo.path,
        executionId: photo.execution?.id,
        meetingId: photo.meeting?.id,
      }));

      logger.info({ executionId }, "Photos added to execution");

      res.status(201).json(photosDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to add execution photos");
      res.status(500).json({ error: error.message });
    }
  };

  deleteExecutionPhoto = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const photoId = Number(req.params.id);

      if (Number.isNaN(photoId) || photoId <= 0) {
        res.status(400).json({ error: "Invalid Photo ID" });
        return;
      }

      await this.photoService.removeExecutionPhoto(photoId);

      logger.info({ photoId }, "Execution photo deleted");

      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete execution photo");
      res.status(500).json({ error: error.message });
    }
  };

  getPhotosByMeetingId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const photos =
        await this.photoService.findPhotosByMeeting(meetingId);

      const photosDTO: PhotoDTO[] = photos.map((photo) => ({
        id: photo.id,
        path: photo.path,
        executionId: photo.execution?.id,
        meetingId: photo.meeting?.id,
      }));

      res.status(200).json(photosDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get meeting photos");
      res.status(500).json({ error: error.message });
    }
  };

  addPhotosToMeeting = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const meetingId = Number(req.params.id);

      if (Number.isNaN(meetingId) || meetingId <= 0) {
        res.status(400).json({ error: "Invalid Meeting ID" });
        return;
      }

      const data: CreatePhotoDTO[] = req.body;

      const photos = await this.photoService.addPhotosToMeeting(
        meetingId,
        data,
      );

      const photosDTO: PhotoDTO[] = photos.map((photo) => ({
        id: photo.id,
        path: photo.path,
        executionId: photo.execution?.id,
        meetingId: photo.meeting?.id,
      }));

      logger.info({ meetingId }, "Photos added to meeting");

      res.status(201).json(photosDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to add meeting photos");
      res.status(500).json({ error: error.message });
    }
  };

  deleteMeetingPhoto = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const photoId = Number(req.params.id);

      if (Number.isNaN(photoId) || photoId <= 0) {
        res.status(400).json({ error: "Invalid Photo ID" });
        return;
      }

      await this.photoService.removeMeetingPhoto(photoId);

      logger.info({ photoId }, "Meeting photo deleted");

      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete meeting photo");
      res.status(500).json({ error: error.message });
    }
  };
}