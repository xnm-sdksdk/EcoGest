import { Router } from "express";

const router = Router();

router.get("/meetings/:id/proceedings");
router.post("/meetings/:id/proceedings");
router.put("/proceedings/:id");

export default router;
