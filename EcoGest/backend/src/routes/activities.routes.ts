import { Router } from "express";
import { ActivityController } from "../controller/activityController.js";

const router = Router();

const activityController = new ActivityController();

router.get(
  "/projects/:projectId/activities",
  activityController.getProjectActivities,
);
router.get("/activities/:id", activityController.getActivityById);

router.post(
  "/projects/:projectId/activities",
  activityController.createActivity,
);
router.put("/activities/:id", activityController.updateActivityById);
router.delete("/activities/:id", activityController.deleteActivityById);

router.put("/activities/:id/approve", activityController.approveActivityById);
router.put("/activities/:id/reject", activityController.rejectActivityById);

export default router;
