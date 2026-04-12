import { Router } from "express";

const router = Router();

router.get("/projects/:id/challenges/:challengeId/progress/:userId");
router.put("/challenges/:id/progress");

export default router;
