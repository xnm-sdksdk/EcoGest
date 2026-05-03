import type {Request, Response} from "express";
import {ActivityService} from "../services/activityService/activityService.js";
import {ActivityServiceImpl} from "../services/activityService/impl/activityServiceImpl.js";
import {logger} from "../utils/logger/logger.js";
import {ActivityDTO, CreateActivityDTO, UpdateActivityDTO,} from "../dto/activityDTO.js";

export class ActivityController {
  private readonly activityService: ActivityService;

  constructor() {
    this.activityService = new ActivityServiceImpl();
  }

  getProjectActivities = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = Number(req.params.projectId);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }
      const activities =
        await this.activityService.findActivitiesByProjectId(projectId);
      if (!activities) {
        res.status(404).json({ error: "Activities not found" });
        return;
      }

      const activitiesDTO: ActivityDTO[] = activities.map((activity) => ({
        id: activity.id,
        name: activity.name,
        description: activity.description,
        area: activity.area,
        resources: activity.resources,
        startDate: activity.startDate,
        endDate: activity.endDate,
        createdBy: activity.createdBy,
        state: activity.state,
        updatedAt: activity.updatedAt,
      }));
      res.status(200).json(activitiesDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all activities");
      res.status(500).json({ error: error.message });
    }
  };

  getActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
      const activityId = Number(req.params.id);
      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const activity = await this.activityService.findActivityById(activityId);

      if (!activity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }

      const activityDTO: ActivityDTO = {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        area: activity.area,
        resources: activity.resources,
        startDate: activity.startDate,
        endDate: activity.endDate,
        createdBy: activity.createdBy,
        state: activity.state,
        updatedAt: activity.updatedAt,
      };

      logger.info({ activityDTO }, "Activity updated");
      res.status(200).json(activityDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all activities");
      res.status(500).json({ error: error.message });
    }
  };

  createActivity = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = Number(req.params.projectId);
      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }
      const data: CreateActivityDTO = req.body;
      if (
        !data.name ||
        !data.description ||
        !data.area ||
        !data.resources ||
        !data.startDate ||
        !data.endDate
      ) {
        res.status(400).json({
          error:
            "Missing required fields: name, description, area, resources, startDate, endDate",
        });
        return;
      }

      const activity = await this.activityService.createActivity(
        projectId,
        data,
      );

      if (!activity) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      const activityDTO: ActivityDTO = {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        area: activity.area,
        resources: activity.resources,
        startDate: activity.startDate,
        endDate: activity.endDate,
        createdBy: activity.createdBy,
        state: activity.state,
        updatedAt: activity.updatedAt,
      };
      logger.info({ activityId: activity.id, projectId }, "Activity created");
      res.status(201).json(activityDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all activities");
      res.status(500).json({ error: error.message });
    }
  };

  updateActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
      const activityId = Number(req.params.id);
      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const data: UpdateActivityDTO = req.body;

      const updateActivity = await this.activityService.updateActivityById(
        activityId,
        data,
      );

      if (!updateActivity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }

      const activityDTO: ActivityDTO = {
        id: updateActivity.id,
        name: updateActivity.name,
        description: updateActivity.description,
        area: updateActivity.area,
        resources: updateActivity.resources,
        startDate: updateActivity.startDate,
        endDate: updateActivity.endDate,
        createdBy: updateActivity.createdBy,
        state: updateActivity.state,
        updatedAt: updateActivity.updatedAt,
      };

      logger.info({ activityDTO }, "Activity updated");
      res.status(200).json(activityDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all activities");
      res.status(500).json({ error: error.message });
    }
  };

  deleteActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
      const activityId = Number(req.params.id);
      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      await this.activityService.removeActivityById(activityId);
      logger.info({ activityId }, "Activity deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete activity by id.");
      res.status(500).json({ error: error.message });
    }
  };

  approveActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
      const activityId = Number(req.params.id);
      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const activity =
        await this.activityService.approveActivityById(activityId);
      if (!activity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }

      const activityDTO: ActivityDTO = {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        area: activity.area,
        resources: activity.resources,
        startDate: activity.startDate,
        endDate: activity.endDate,
        state: activity.state,
        createdBy: activity.createdBy,
        updatedAt: activity.updatedAt,
      };

      logger.info({ activityId }, "Activity approved");
      res.status(200).json(activityDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all activities");
      res.status(500).json({ error: error.message });
    }
  };

  rejectActivityById = async (req: Request, res: Response): Promise<void> => {
    try {
      const activityId = Number(req.params.id);
      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const activity =
        await this.activityService.rejectActivityById(activityId);
      if (!activity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }

      const activityDTO: ActivityDTO = {
        id: activity.id,
        name: activity.name,
        description: activity.description,
        area: activity.area,
        resources: activity.resources,
        startDate: activity.startDate,
        endDate: activity.endDate,
        state: activity.state,
        createdBy: activity.createdBy,
        updatedAt: activity.updatedAt,
      };

      logger.info({ activityId }, "Activity rejected");
      res.status(200).json(activityDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all activities");
      res.status(500).json({ error: error.message });
    }
  };
}
