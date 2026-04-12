import { Router } from "express";

const router = Router();

router.get("/executions/:id/photos");
router.post("/executions/:id/photos");
router.delete("/photos/executions/:id");

export default router;
