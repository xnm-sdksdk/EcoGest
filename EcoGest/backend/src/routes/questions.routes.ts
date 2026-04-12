import { Router } from 'express';

const router = Router();

router.get("/questionnaires/:id/questions");
router.post("/questionnaires/:id/questions");
router.put("/questions/:id");
router.delete("/questions/:id");

export default router;