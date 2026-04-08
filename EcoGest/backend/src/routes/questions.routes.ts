import { Router } from 'express';

const router = Router();

router.get("/api/questionnaires/:id/questions");
router.post("/api/questionnaires/:id/questions");
router.put("/api/questions/:id");
router.delete("/api/questions/:id");

export default router;