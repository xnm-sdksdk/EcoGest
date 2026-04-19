import { Router } from "express";
import { ProjectController } from "../controller/projectController.js";

const router = Router();

const projectController = new ProjectController();

router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
// router.post("/projects");
// router.put("/projects/:id");
// router.delete("/projects/:id");

export default router;
