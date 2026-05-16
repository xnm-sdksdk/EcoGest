import { Router } from "express";
import { LevelController } from "../controller/levelController.js";

const router = Router();

const levelController = new LevelController();

router.get("/levels", levelController.getAllLevels);
router.get("/levels/:id", levelController.getLevelById);
router.post("/levels", levelController.createLevel);
router.put("/levels/:id", levelController.updateLevelById);
router.delete("/levels/:id", levelController.deleteLevelById);
router.get("/projects/:projectId/levels", levelController.getLevelByProjectId);
router.put(
  "/projects/:projectId/levels",
  levelController.updateLevelByProjectId,
);

export default router;
