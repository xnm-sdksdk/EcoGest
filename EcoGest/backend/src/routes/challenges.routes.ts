import { Router } from "express";

const router = Router();

router.get("/challenges/:challengeId/progress/:userId");
router.put("/challenges/:id/progress");

export default router;
