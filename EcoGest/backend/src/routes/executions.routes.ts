import { Router } from "express";

const router = Router();

router.get("/api/activities/:id/execution");
router.post("/api/activities/:id/execution");
router.put("/api/executions/:id");
router.delete("/api/executions/:id");

export default router;
