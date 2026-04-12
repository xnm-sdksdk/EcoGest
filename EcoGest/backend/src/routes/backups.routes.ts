import { Router } from "express";

const router = Router();

router.post("/admin/backup");
router.get("/admin/backup");
router.post("/admin/restore");

export default router;
