import { Router } from "express";
import { PhotoController } from "../controller/photoController.js";

const router = Router();

const photoController = new PhotoController();

router.get(
  "/meetings/:id/photos",
  photoController.getPhotosByMeetingId,
);

router.post(
  "/meetings/:id/photos",
  photoController.addPhotosToMeeting,
);

router.delete(
  "/photos/meetings/:id",
  photoController.deleteMeetingPhoto,
);

export default router;