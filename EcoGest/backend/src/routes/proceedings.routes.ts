import { Router } from "express";
import { ProceedingsController } from "../controller/proceedingsController.js";

const router = Router();

const proceedingsController = new ProceedingsController();

router.get(
  "/meetings/:id/proceedings",
  proceedingsController.getProceedingByMeetingId,
);

router.post(
  "/meetings/:id/proceedings",
  proceedingsController.addProceedingToMeeting,
);

router.put(
  "/proceedings/:id",
  proceedingsController.updateProceedingById,
);

export default router;