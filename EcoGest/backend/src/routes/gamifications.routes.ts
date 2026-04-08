import { Router } from 'express';

const router = Router();

router.get("/api/projects/:id/ranking");
router.get("/api/projects/:id/scoring");
router.get("/api/projects/:id/challenges");
router.get("/api/challenges/:id");
router.post("/api/projects/:id/challenges");
router.put("/api/challenges/:id");
router.delete("/api/challenges/:id");
router.get("/api/challenges/:id/progress");



export default router;