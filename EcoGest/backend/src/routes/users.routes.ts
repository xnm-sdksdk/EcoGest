import { Router } from "express";
import { UserController } from "../controller/userController.js";

const router = Router();

const userController = new UserController();

router.get("/users/", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);

export default router;
