import { Router } from "express";
import { QuestionController } from "../controller/questionController.js";

const router = Router();
const questionController = new QuestionController();

router.get(
  "/questionnaires/:questionnaireId/questions",
  questionController.getQuestionsByQuestionnaireId,
);
router.post(
  "/questionnaires/:questionnaireId/questions",
  questionController.createQuestionsByQuestionnaireId,
);
router.put("/questions/:id", questionController.updateQuestionById);
router.delete("/questions/:id", questionController.deleteQuestionById);

export default router;
