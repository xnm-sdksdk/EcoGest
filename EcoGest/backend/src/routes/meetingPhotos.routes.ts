import { Router } from "express";

const router = Router();

router.get("/meetings/:id/photos");
router.post("/meetings/:id/photos");
router.delete("/photos/meetings/:id");

export default router;
