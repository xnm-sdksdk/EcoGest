import { Router } from "express";

const router = Router();

router.get("/api/projects/:id/report");
router.get("/api/projects/:id/report/export");

export default router;
