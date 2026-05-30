import { Router } from "express";
import { PhotoController } from "../controller/photoController.js";

const router = Router();

const photoController = new PhotoController();

router.get(
  "/executions/:id/photos",
  photoController.getPhotosByExecutionId,
);

router.post(
  "/executions/:id/photos",
  photoController.addPhotosToExecution,
);

router.delete(
  "/photos/executions/:id",
  photoController.deleteExecutionPhoto,
);

export default router;