import { Router } from 'express';

const router = Router();

router.get("/projects/:id/ranking");
router.get("/projects/:id/scoring");
router.get("/projects/:id/challenges");
router.get("/challenges/:id");
router.post("/projects/:id/challenges");
router.put("/challenges/:id");
router.delete("/challenges/:id");
router.get("/challenges/:id/progress");



export default router;