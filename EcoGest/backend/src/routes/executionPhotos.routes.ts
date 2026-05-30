import { Router } from "express";
import { PhotoController } from "../controller/photoController.js";

const router = Router();

const photoController = new PhotoController();

router.get("/executions/:id/photos", (req, res, next) => {
  /* #swagger.tags = ['ExecutionPhotos']
     #swagger.summary = 'Listar fotos de uma execução'
  */
  next();
}, photoController.getPhotosByExecutionId);

router.post("/executions/:id/photos", (req, res, next) => {
  /* #swagger.tags = ['ExecutionPhotos']
     #swagger.summary = 'Adicionar fotos a uma execução'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: [
            {
            path: "/uploads/executions/photo1.jpg"
            }
        ]
    }
  */
  next();
}, photoController.addPhotosToExecution);

router.delete("/photos/executions/:id", (req, res, next) => {
  /* #swagger.tags = ['ExecutionPhotos']
     #swagger.summary = 'Eliminar foto de uma execução'
  */
  next();
}, photoController.deleteExecutionPhoto);

export default router;