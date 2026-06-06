import { Router } from "express";
import { ConvocationController } from "../controller/convocationController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const convocationController = new ConvocationController();

router.get(
  "/meetings/:id/convocations",
  (req, res, next) => {
    /* #swagger.tags = ['Convocations']
     #swagger.summary = 'Listar convocações de uma reunião'
  */
    next();
  },
  convocationController.getMeetingConvocations,
);

router.post(
  "/meetings/:id/convocations",
  (req, res, next) => {
    /* #swagger.tags = ['Convocations']
     #swagger.summary = 'Criar convocação para uma reunião'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateConvocationRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.SECRETARIAT),
  convocationController.createMeetingConvocation,
);

router.post(
  "/meetings/:id/convocations/resend",
  (req, res, next) => {
    /* #swagger.tags = ['Convocations']
     #swagger.summary = 'Reenviar todas as convocações de uma reunião'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.SECRETARIAT),
  convocationController.resendMeetingConvocations,
);

export default router;
