import { Router } from "express";

const router = Router();

router.get("/activities/:id/registrations");
router.post("/activities/:id/registrations");
router.delete("/activities/:token");
router.delete("/activities/:id/admin");

export default router;
