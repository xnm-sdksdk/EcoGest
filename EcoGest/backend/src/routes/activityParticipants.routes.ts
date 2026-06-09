import { Router } from "express";
import { ActivityParticipantController } from "../controller/activityParticipantsController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const activityParticipantController = new ActivityParticipantController();

router.get(
  "/activities/:id/participants",
  (req, res, next) => {
    /* #swagger.tags = ['Activity Participants']
       #swagger.summary = 'Listar participantes de uma atividade'
    */
    next();
  },
  activityParticipantController.getActivityParticipants,
);

router.post(
  "/activities/:id/participants",
  (req, res, next) => {
    /* #swagger.tags = ['Activity Participants']
       #swagger.summary = 'Adicionar participante a uma atividade'
       #swagger.parameters['obj'] = {
         in: 'body',
         schema: {
           userId: 1
         }
       }
    */
    next();
  },
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
    UserProfile.MEMBER,
    UserProfile.SECRETARIAT,
  ),
  activityParticipantController.addActivityParticipant,
);

router.delete(
  "/activities/:id/participants/:userId",
  (req, res, next) => {
    /* #swagger.tags = ['Activity Participants']
       #swagger.summary = 'Remover participante de uma atividade'
    */
    next();
  },
  authenticate,
  authorize(
    UserProfile.ADMIN,
    UserProfile.COORDINATOR,
  ),
  activityParticipantController.removeActivityParticipant,
);

export default router;