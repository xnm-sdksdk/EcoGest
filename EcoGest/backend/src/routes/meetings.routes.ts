import { Router } from 'express';

const router = Router();

router.get("/api/projects/:id/meetings");
router.get("/api/meetings/:id");
router.post("/api/projects/:id/meetings");
router.put("/api/meetings/:id");
router.delete("/api/meetings/:id");
router.put("/api/meetings/:id/cancel");

export default router;