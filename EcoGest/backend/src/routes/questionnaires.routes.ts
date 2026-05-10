import { Router } from "express";
import { QuestionnaireController } from "../controller/questionnaireController.js";

const router = Router();

const questionnaireController = new QuestionnaireController();

router.get(
  "/projects/:id/questionnaires",
  questionnaireController.getProjectQuestionnaires,
);

router.post(
  "/projects/:id/questionnaires",
  questionnaireController.createQuestionnaire,
);

router.get(
  "/questionnaires/:id",
  questionnaireController.getQuestionnaireById,
);

router.put(
  "/questionnaires/:id",
  questionnaireController.updateQuestionnaireById,
);

router.delete(
  "/questionnaires/:id",
  questionnaireController.deleteQuestionnaireById,
);

router.put(
  "/questionnaires/:id/publish",
  questionnaireController.publishQuestionnaireById,
);

export default router;