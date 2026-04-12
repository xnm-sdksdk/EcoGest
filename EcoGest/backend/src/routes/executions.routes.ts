import { Router } from "express";

const router = Router();

router.get("/activities/:id/execution");
router.post("/activities/:id/execution");
router.put("/executions/:id");
router.delete("/executions/:id");

export default router;
