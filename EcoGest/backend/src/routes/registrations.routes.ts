import { Router } from "express";

const router = Router();

router.get("/activities/:id/registrations");
router.post("/activities/:id/registrations");
router.delete("/registrations/:token");
router.delete("/registrations/:id/admin");

export default router;
