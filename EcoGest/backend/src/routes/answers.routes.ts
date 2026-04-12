import { Router } from "express";

const router = Router();

router.get("/questionnaires/:id/answers");
router.get("/questionnaires/:id/results");

export default router;
