import { Router } from "express";

const router = Router();

router.get("/api/projects/:id/dashboard");
router.get("/api/projects/:id/dashboard/monthly-activity");

export default router;
