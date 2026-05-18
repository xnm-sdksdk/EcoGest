import { Router } from "express";
import { DashboardController } from "../controller/dashboardController.js";

const router = Router();

const dashboardController = new DashboardController();

router.get(
  "/projects/:projectId/dashboard",
  dashboardController.getMetricsByProjectId,
);

/*
router.get(
  "/projects/:projectId/dashboard/monthly-activity",
  dashboardController.getMonthlyMetricsByProjectId,
);
*/

export default router;
