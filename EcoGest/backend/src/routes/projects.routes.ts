import { Router } from "express";

const router = Router();

router.get("/api/projects");
router.get("/api/projects/:id");
router.post("/api/projects");
router.put("/api/projects/:id");
router.delete("/api/projects/:id");

export default router;
