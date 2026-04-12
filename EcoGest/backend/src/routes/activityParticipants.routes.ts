import { Router } from "express";

const router = Router();

router.get("/activities/:id/participants");
router.post("/activities/:id/participants");
router.delete("/activities/:id/participants/:userId");

export default router;
