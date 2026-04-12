import { Router } from "express";

const router = Router();

router.get("/projects/:id/report");
router.get("/projects/:id/report/export");

export default router;
