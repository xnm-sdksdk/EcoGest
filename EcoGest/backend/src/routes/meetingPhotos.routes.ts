import { Router } from "express";

const router = Router();

router.get("/api/meetings/:id/photos");
router.post("/api/meetings/:id/photos");
router.delete("/api/photos/meetings/:id");

export default router;
