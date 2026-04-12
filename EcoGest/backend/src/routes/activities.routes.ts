import { Router } from "express";

const router = Router();

router.get("/projects/:id/activities");
router.get("/activities/:id");

router.post("/projects/:id/activities");
router.put("/activities/:id");
router.delete("/activities/:id");

router.put("/activities/:id/approve");
router.put("/activities/:id/reject");

export default router;
