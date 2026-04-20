import { Router } from "express";
import { UserController } from "../controller/userController.js";

const router = Router();

const userController = new UserController();

/*router.get("/users/");
router.get("/users/:id");
router.put("/users/:id");
*/
router.delete("/users/:id", userController.deleteUserById);

export default router;
