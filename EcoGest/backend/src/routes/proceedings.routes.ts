import { Router } from "express";
import { ProceedingsController } from "../controller/proceedingsController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const proceedingsController = new ProceedingsController();

router.get(
  "/meetings/:id/proceedings",
  (req, res, next) => {
    /* #swagger.tags = ['Proceedings']
     #swagger.summary = 'Obter ata de uma reunião'
  */
    next();
  },
  proceedingsController.getProceedingByMeetingId,
);

router.post(
  "/meetings/:id/proceedings",
  (req, res, next) => {
    /* #swagger.tags = ['Proceedings']
     #swagger.summary = 'Criar ata para uma reunião'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateProceedingsRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.SECRETARIAT),
  proceedingsController.addProceedingToMeeting,
);

router.put(
  "/proceedings/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Proceedings']
     #swagger.summary = 'Atualizar ata'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateProceedingsRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.SECRETARIAT),
  proceedingsController.updateProceedingById,
);

export default router;
