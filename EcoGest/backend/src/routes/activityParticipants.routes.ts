import { Router } from "express";

const router = Router();

router.get("/api/activities/:id/participants");
router.post("/api/activities/:id/participants");
router.delete("/api/activities/:id/participants/:userId");

export default router;
