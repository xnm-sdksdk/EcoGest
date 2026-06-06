import { Router } from "express";
import { AuthController } from "../controller/authController.js";

const router = Router();
const authController = new AuthController();

router.post("/auth/login", authController.login);
/*router.post("/auth/logout");
router.post("/auth/recover-password");
router.post("/auth/accept-invite");
router.put("/auth/reset-password");*/

export default router;
