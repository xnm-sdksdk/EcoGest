import { Router } from "express";
import { ActivityController } from "../controller/activityController.js";

const router = Router();

const activityController = new ActivityController();

router.get("/projects/:projectId/activities", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Listar atividades de um projeto'
  */
  next();
}, activityController.getProjectActivities);

router.get("/activities/:id", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Obter atividade por ID'
  */
  next();
}, activityController.getActivityById);

router.post("/projects/:projectId/activities", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Criar atividade num projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateActivityRequest' }
     }
  */
  next();
}, activityController.createActivity);

router.put("/activities/:id", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Atualizar atividade'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateActivityRequest' }
     }
  */
  next();
}, activityController.updateActivityById);

router.delete("/activities/:id", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Eliminar atividade'
  */
  next();
}, activityController.deleteActivityById);

router.put("/activities/:id/approve", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Aprovar atividade'
  */
  next();
}, activityController.approveActivityById);

router.put("/activities/:id/reject", (req, res, next) => {
  /* #swagger.tags = ['Activities']
     #swagger.summary = 'Rejeitar atividade'
  */
  next();
}, activityController.rejectActivityById);

export default router;
