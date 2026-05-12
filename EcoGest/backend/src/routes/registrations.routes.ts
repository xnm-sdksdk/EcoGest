import { Router } from "express";
import { RegistrationController } from "../controller/registrationController.js";

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
  registrationsController.deleteRegistrationById,
);

export default router;
