import { Router } from "express";

const router = Router();

router.get("/projects/:id/questionnaires");
router.post("/projects/:id/questionnaires");
router.get("/questionnaires/:id");
router.put("/questionnaires/:id");
router.delete("/questionnaires/:id");
router.put("/questionnaires/:id/publish");

export default router;
