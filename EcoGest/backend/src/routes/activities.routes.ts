import { Router } from "express";
import { ActivityController } from "../controller/activityController.js";
import { authorize } from "../middleware/authorize.js";
import { authenticate } from "../middleware/authenticate.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();

const activityController = new ActivityController();

router.get(
  "/projects/:projectId/activities",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Listar atividades de um projeto'
  */
    next();
  },
  activityController.getProjectActivities,
);

router.get(
  "/activities/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Obter atividade por ID'
  */
    next();
  },
  activityController.getActivityById,
);

router.post(
  "/projects/:projectId/activities",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Criar atividade num projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateActivityRequest' }
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
  activityController.createActivity,
);

router.put(
  "/activities/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Atualizar atividade'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateActivityRequest' }
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
  activityController.updateActivityById,
);

router.delete(
  "/activities/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Eliminar atividade'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  activityController.deleteActivityById,
);

router.put(
  "/activities/:id/approve",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Aprovar atividade'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  activityController.approveActivityById,
);

router.put(
  "/activities/:id/reject",
  (req, res, next) => {
    /* #swagger.tags = ['Activities']
     #swagger.summary = 'Rejeitar atividade'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  activityController.rejectActivityById,
);

export default router;
