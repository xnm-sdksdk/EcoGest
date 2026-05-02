import { Router } from "express";
import { LevelController } from "../controller/levelController.js";

const router = Router();

const levelController = new LevelController();

// router.get("/levels", levelController.getAllLevels);
// router.get("/levels/:id", levelController.getLevelById);
//
// router.post("/levels");
// router.put("/levels/:id");
//
// router.delete("/levels/:id");
// router.get("/projects/:id/levels");
// router.put("/projects/:id/levels");

export default router;
