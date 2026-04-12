import { Router } from "express";

const router = Router();

router.get("/projects/:id/dashboard");
router.get("/projects/:id/dashboard/monthly-activity");

export default router;
