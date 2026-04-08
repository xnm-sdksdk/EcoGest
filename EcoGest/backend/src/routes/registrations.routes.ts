import { Router } from "express";

const router = Router();

router.get("/api/activities/:id/registrations");
router.post("/api/activities/:id/registrations");
router.delete("/api/activities/:token");
router.delete("/api/activities/:id/admin");

export default router;
