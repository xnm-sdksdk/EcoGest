import { Router } from "express";
import { AnswerController } from "../controller/answerController.js";

const router = Router();

const answerController = new AnswerController();

// No auth needed
router.post(
  "/questionnaires/:questionnaireId/answers",
  answerController.createAnswerByQuestionnaireId,
);

router.get(
  "/questionnaires/:questionnaireId/answers",
  answerController.getAnswerByQuestionnaireId,
);

router.get(
  "/questionnaires/:questionnaireId/results",
  answerController.getAnswerResultsByQuestionnaireId,
);

export default router;
