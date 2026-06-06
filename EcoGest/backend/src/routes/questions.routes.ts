import { Router } from "express";
import { QuestionController } from "../controller/questionController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { UserProfile } from "../entity/userEntity.js";

const router = Router();
const questionController = new QuestionController();

router.get(
  "/questionnaires/:questionnaireId/questions",
  (req, res, next) => {
    /* #swagger.tags = ['Questions']
     #swagger.summary = 'Listar perguntas de um questionário'
  */
    next();
  },
  questionController.getQuestionsByQuestionnaireId,
);

router.post(
  "/questionnaires/:questionnaireId/questions",
  (req, res, next) => {
    /* #swagger.tags = ['Questions']
     #swagger.summary = 'Criar pergunta num questionário'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/CreateQuestionRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  questionController.createQuestionsByQuestionnaireId,
);

router.put(
  "/questions/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Questions']
     #swagger.summary = 'Atualizar pergunta'
     #swagger.parameters['obj'] = {
       in: 'body',
       schema: { $ref: '#/definitions/UpdateQuestionRequest' }
     }
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  questionController.updateQuestionById,
);

router.delete(
  "/questions/:id",
  (req, res, next) => {
    /* #swagger.tags = ['Questions']
     #swagger.summary = 'Eliminar pergunta'
  */
    next();
  },
  authenticate,
  authorize(UserProfile.ADMIN, UserProfile.COORDINATOR),
  questionController.deleteQuestionById,
);

export default router;
