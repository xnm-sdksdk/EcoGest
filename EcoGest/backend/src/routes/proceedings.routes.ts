import { Router } from "express";

const router = Router();

router.get("/api/meetings/:id/proceedings");
router.post("/api/meetings/:id/proceedings");
router.put("/api/proceedings/:id");

export default router;
