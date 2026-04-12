import { Router } from "express";

const router = Router();

router.get("/meetings/:id/calls");
router.post("/meetings/:id/calls");
router.post("/meetings/:id/calls/resend");

export default router;
