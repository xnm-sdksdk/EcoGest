import { Router } from "express";
import { QuestionnaireController } from "../controller/questionnaireController.js";

const router = Router();

const questionnaireController = new QuestionnaireController();

router.get("/projects/:id/questionnaires", (req, res, next) => {
  /* #swagger.tags = ['Questionnaires']
     #swagger.summary = 'Listar questionários de um projeto'
  */
  next();
}, questionnaireController.getProjectQuestionnaires);

router.post("/projects/:id/questionnaires", (req, res, next) => {
  /* #swagger.tags = ['Questionnaires']
     #swagger.summary = 'Criar questionário num projeto'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateQuestionnaireRequest' }
     }
  */
  next();
}, questionnaireController.createQuestionnaire);

router.get("/questionnaires/:id", (req, res, next) => {
  /* #swagger.tags = ['Questionnaires']
     #swagger.summary = 'Obter questionário por ID'
  */
  next();
}, questionnaireController.getQuestionnaireById);

router.put("/questionnaires/:id", (req, res, next) => {
  /* #swagger.tags = ['Questionnaires']
     #swagger.summary = 'Atualizar questionário'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateQuestionnaireRequest' }
     }
  */
  next();
}, questionnaireController.updateQuestionnaireById);

router.delete("/questionnaires/:id", (req, res, next) => {
  /* #swagger.tags = ['Questionnaires']
     #swagger.summary = 'Eliminar questionário'
  */
  next();
}, questionnaireController.deleteQuestionnaireById);

router.put("/questionnaires/:id/publish", (req, res, next) => {
  /* #swagger.tags = ['Questionnaires']
     #swagger.summary = 'Publicar questionário'
  */
  next();
}, questionnaireController.publishQuestionnaireById);

export default router;