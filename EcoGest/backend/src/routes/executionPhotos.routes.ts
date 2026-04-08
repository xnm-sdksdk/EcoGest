import { Router } from "express";

const router = Router();

router.get("/api/executions/:id/photos");
router.post("/api/executions/:id/photos");
router.delete("/api/photos/executions/:id");

export default router;
