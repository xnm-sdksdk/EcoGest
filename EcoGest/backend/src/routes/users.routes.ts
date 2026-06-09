import { Router } from "express";
import { UserController } from "../controller/userController.js";
import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authenticate.js";
import { UserProfile } from "../entity/userEntity.js";
import { authorizeOwnerOrAdmin } from "../middleware/authorizeOwner.js";

const router = Router();

const userController = new UserController();

router.get("/users/", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put(
  "/users/:id",
  authenticate,
  authorizeOwnerOrAdmin,
  authorize(UserProfile.ADMIN),
  userController.updateUserById,
);
router.delete(
  "/users/:id",
  authenticate,
  authorize(UserProfile.ADMIN),
  userController.deleteUserById,
);

export default router;
