import type { Request, Response } from "express";
import { DashboardService } from "../services/dashboardService/dashboardService.js";
import { DashboardServiceImpl } from "../services/dashboardService/impl/dashboardServiceImpl.js";

export class DashboardController {
  private readonly dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardServiceImpl();
  }

  getMetricsByProjectId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {};

  getMonthlyMetricsByProjectId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {};
}
