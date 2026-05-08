import { Router } from "express";
import { MeetingController } from "../controller/meetingController.js";

const router = Router();

const meetingController = new MeetingController();

router.get("/projects/:id/meetings", meetingController.getProjectMeetings);
router.get("/meetings/:id", meetingController.getMeetingById);
router.post("/projects/:id/meetings", meetingController.createMeeting);
router.put("/meetings/:id", meetingController.updateMeetingById);
router.delete("/meetings/:id", meetingController.deleteMeetingById);
router.put("/meetings/:id/cancel", meetingController.cancelMeetingById);

export default router;