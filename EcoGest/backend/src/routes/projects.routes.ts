import { Router } from "express";
import { ProjectController } from "../controller/projectController.js";

const router = Router();

const projectController = new ProjectController();

router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
router.post("/projects", projectController.createProject);
router.put("/projects/:id", projectController.updateProjectById);
router.delete("/projects/:id", projectController.deleteProjectById);

export default router;
