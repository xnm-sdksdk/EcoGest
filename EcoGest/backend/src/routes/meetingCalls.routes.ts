import { Router } from "express";

const router = Router();

router.get("/api/meetings/:id/calls");
router.post("/api/meetings/:id/calls");
router.post("/api/meetings/:id/calls/resend");

export default router;
