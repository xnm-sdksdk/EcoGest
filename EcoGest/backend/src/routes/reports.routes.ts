import { Router } from "express";

const router = Router();

router.get("/projects/:projectId/report");
router.get("/projects/:projectId/report/export");

export default router;
