import { Router } from "express";
import { RegistrationController } from "../controller/registrationController.js";
import { UserProfile } from "../entity/userEntity.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();
const registrationsController = new RegistrationController();

router.get(
  "/activities/:activityId/registrations",
  registrationsController.getRegistrationByActivityId,
);
router.post(
  "/activities/:activityId/registrations",
  registrationsController.createRegistrationByActivityId,
);
router.delete(
  "/registrations/:token",
  registrationsController.deleteRegistrationByToken,
);
router.delete(
  "/registrations/:id/admin",
  authenticate,
  authorize(
    UserProfile.COORDINATOR,
    UserProfile.SECRETARIAT,
    UserProfile.ADMIN,
  ),
  registrationsController.deleteRegistrationById,
);

export default router;
