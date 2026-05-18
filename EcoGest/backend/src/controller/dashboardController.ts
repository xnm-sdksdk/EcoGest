import type { Request, Response } from "express";
import { DashboardService } from "../services/dashboardService/dashboardService.js";
import { DashboardServiceImpl } from "../services/dashboardService/impl/dashboardServiceImpl.js";
import { logger } from "../utils/logger/logger.js";

export class DashboardController {
  private readonly dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardServiceImpl();
  }

  getMetricsByProjectId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.projectId);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid project ID" });
        return;
      }

      const metrics =
        await this.dashboardService.findMetricsByProjectId(projectId);
      res.status(200).json(metrics);
    } catch (e: any) {
      if (e.message?.includes("not found")) {
        res.status(404).json({ error: e.message });
        return;
      }
      logger.error({ err: e }, "Error fetching dashboard metrics");
      res.status(500).json({ error: e.message });
    }
  };

  /*  getMonthlyMetricsByProjectId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {};*/
}
