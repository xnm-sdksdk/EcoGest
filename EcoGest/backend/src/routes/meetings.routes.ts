import { Router } from "express";
import { MeetingController } from "../controller/meetingController.js";

const router = Router();

const meetingController = new MeetingController();

router.get("/projects/:id/meetings", (req, res, next) => {
  /* #swagger.tags = ['Meetings']
     #swagger.summary = 'Listar reuniões de um projeto'
  */
  next();
}, meetingController.getProjectMeetings);

router.get("/meetings/:id", (req, res, next) => {
  /* #swagger.tags = ['Meetings']
     #swagger.summary = 'Obter reunião por ID'
  */
  next();
}, meetingController.getMeetingById);

router.post("/projects/:id/meetings", (req, res, next) => {
  /* #swagger.tags = ['Meetings']
     #swagger.summary = 'Criar reunião num projeto'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateMeetingRequest' }
     }
  */
  next();
}, meetingController.createMeeting);

router.put("/meetings/:id", (req, res, next) => {
  /* #swagger.tags = ['Meetings']
     #swagger.summary = 'Atualizar reunião'
     #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateMeetingRequest' }
     }
  */
  next();
}, meetingController.updateMeetingById);

router.delete("/meetings/:id", (req, res, next) => {
  /* #swagger.tags = ['Meetings']
     #swagger.summary = 'Eliminar reunião'
  */
  next();
}, meetingController.deleteMeetingById);

router.put("/meetings/:id/cancel", (req, res, next) => {
  /* #swagger.tags = ['Meetings']
     #swagger.summary = 'Cancelar reunião'
  */
  next();
}, meetingController.cancelMeetingById);

export default router;