import { Router } from "express";

const router = Router();

router.get("/projects/:id/members");
router.post("/projects/:id/members");
router.delete("/projects/:id/members/:userId");

export default router;
