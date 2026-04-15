import { Router } from "express";

const router = Router();

router.get("/meetings/:id/convocations");
router.post("/meetings/:id/convocations");
router.post("/meetings/:id/convocations/resend");

export default router;
