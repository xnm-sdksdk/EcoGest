import { Router } from "express";

const router = Router();

router.post("/auth/login");
router.post("/auth/logout");
router.post("/auth/recover-password");
router.post("/auth/accept-invite");
router.put("/auth/reset-password");

export default router;
