import { Router } from "express";
import { GamificationController } from "../controller/gamificationController.js";

const router = Router();

const gamificationController = new GamificationController();

router.get(
  "/projects/:projectId/ranking",
  gamificationController.getRankingByProjectId,
);
router.get(
  "/projects/:projectId/scoring",
  gamificationController.getScoringByProjectId,
);
/*
router.get("/projects/:projectId/challenges");
router.get("/challenges/:id");
router.post("/projects/:projectId/challenges");
router.put("/challenges/:id");
router.delete("/challenges/:id");
router.get("/challenges/:id/progress");
*/
export default router;
