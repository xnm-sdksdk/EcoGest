import { Router } from 'express';

const router = Router();

router.get('/projects/:id/meetings');
router.get("/meetings/:id");
router.post("/projects/:id/meetings");
router.put("/meetings/:id");
router.delete("/meetings/:id");
router.put("/meetings/:id/cancel");

export default router;



