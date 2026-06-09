import { Router } from "express";
import { ActivityParticipantController } from "../controller/activityParticipantsController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const activityParticipantController = new ActivityParticipantController();

router.get(
  "/activities/:id/participants",
  activityParticipantController.getActivityParticipants,
);

router.post(
  "/activities/:id/participants",
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
    UserProfile.MEMBER,
    UserProfile.SECRETARIAT,
  ),
  activityParticipantController.addActivityParticipant,
);

router.delete(
  "/activities/:id/participants/:userId",
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
  ),
  activityParticipantController.removeActivityParticipant,
);
export default router;
