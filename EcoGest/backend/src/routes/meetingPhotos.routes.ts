import { Router } from "express";
import { PhotoController } from "../controller/photoController.js";

const router = Router();

const photoController = new PhotoController();

router.get("/meetings/:id/photos", (req, res, next) => {
  /* #swagger.tags = ['MeetingPhotos']
     #swagger.summary = 'Listar fotos de uma reunião'
  */
  next();
}, photoController.getPhotosByMeetingId);

router.post("/meetings/:id/photos", (req, res, next) => {
  /* #swagger.tags = ['MeetingPhotos']
     #swagger.summary = 'Adicionar fotos a uma reunião'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: [
            {
            path: "/uploads/meetings/photo1.jpg"
            }
        ]
    }
  */
  next();
}, photoController.addPhotosToMeeting);

router.delete("/photos/meetings/:id", (req, res, next) => {
  /* #swagger.tags = ['MeetingPhotos']
     #swagger.summary = 'Eliminar foto de uma reunião'
  */
  next();
}, photoController.deleteMeetingPhoto);

export default router;