import { Router } from "express";

const router = Router();

router.get("/api/projects/:id/questionnaires");
router.post("/api/projects/:id/questionnaires");
router.get("/api/questionnaires/:id");
router.put("/api/questionnaires/:id");
router.delete("/api/questionnaires/:id");
router.put("/api/questionnaires/:id/publish");

export default router;
