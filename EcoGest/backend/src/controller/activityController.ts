import type { Request, Response } from "express";
import { ActivityService } from "../services/activityService/activityService.js";
import { ActivityServiceImpl } from "../services/activityService/impl/activityServiceImpl.js";

export class ActivityController {
    private activityService: ActivityService;

    constructor() {
        this.activityService = new ActivityServiceImpl();
    }

    getProjectActivities = () => { }

    getActivityById = () => { }

    createActivityProposal = () => { }

    updateActivityById = () => { }

    deleteActivityById = () => { }

    approveActivityById = () => { }

    rejectActivityById = () => { }
}
