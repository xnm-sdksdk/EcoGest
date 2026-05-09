import { Router } from "express";
import { ProceedingsController } from "../controller/proceedingsController.js";

const router = Router();

const proceedingsController = new ProceedingsController();

router.get("/meetings/:id/proceedings", (req, res, next) => {
  /* #swagger.tags = ['Proceedings']
     #swagger.summary = 'Obter ata de uma reunião'
  */
  next();
}, proceedingsController.getProceedingByMeetingId);

router.post("/meetings/:id/proceedings", (req, res, next) => {
  /* #swagger.tags = ['Proceedings']
     #swagger.summary = 'Criar ata para uma reunião'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateProceedingsRequest' }
     }
  */
  next();
}, proceedingsController.addProceedingToMeeting);

router.put("/proceedings/:id", (req, res, next) => {
  /* #swagger.tags = ['Proceedings']
     #swagger.summary = 'Atualizar ata'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateProceedingsRequest' }
     }
  */
  next();
}, proceedingsController.updateProceedingById);

export default router;