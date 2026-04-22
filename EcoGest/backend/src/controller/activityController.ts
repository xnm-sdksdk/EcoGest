import type {Request, Response} from "express";
import {ActivityService} from "../services/activityService/activityService.js";
import {ActivityServiceImpl} from "../services/activityService/impl/activityServiceImpl.js";

export class ActivityController {
  private readonly activityService: ActivityService;

  constructor() {
    this.activityService = new ActivityServiceImpl();
  }

  getProjectActivities = (req: Request, res: Response) => {};

  getActivityById = (req: Request, res: Response) => {};

  createActivityProposal = (req: Request, res: Response) => {};

  updateActivityById = (req: Request, res: Response) => {};

  deleteActivityById = (req: Request, res: Response) => {};

  approveActivityById = (req: Request, res: Response) => {};

  rejectActivityById = (req: Request, res: Response) => {};
}
