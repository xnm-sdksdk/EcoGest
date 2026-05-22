import { Router } from "express";
import { ConvocationController } from "../controller/convocationController.js";

const router = Router();

const convocationController = new ConvocationController();

router.get(
  "/meetings/:id/convocations",
  convocationController.getMeetingConvocations,
);

router.post(
  "/meetings/:id/convocations",
  convocationController.createMeetingConvocation,
);

router.post(
  "/meetings/:id/convocations/resend",
  convocationController.resendMeetingConvocations,
);

export default router;