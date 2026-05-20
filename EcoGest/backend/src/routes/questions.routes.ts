import { Router } from "express";
import { QuestionController } from "../controller/questionController.js";

const router = Router();
const questionController = new QuestionController();

router.get("/questionnaires/:questionnaireId/questions", (req, res, next) => {
  /* #swagger.tags = ['Questions']
     #swagger.summary = 'Listar perguntas de um questionário'
  */
  next();
}, questionController.getQuestionsByQuestionnaireId);

router.post("/questionnaires/:questionnaireId/questions", (req, res, next) => {
  /* #swagger.tags = ['Questions']
     #swagger.summary = 'Criar pergunta num questionário'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateQuestionRequest' }
     }
  */
  next();
}, questionController.createQuestionsByQuestionnaireId);

router.put("/questions/:id", (req, res, next) => {
  /* #swagger.tags = ['Questions']
     #swagger.summary = 'Atualizar pergunta'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateQuestionRequest' }
     }
  */
  next();
}, questionController.updateQuestionById);

router.delete("/questions/:id", (req, res, next) => {
  /* #swagger.tags = ['Questions']
     #swagger.summary = 'Eliminar pergunta'
  */
  next();
}, questionController.deleteQuestionById);

export default router;