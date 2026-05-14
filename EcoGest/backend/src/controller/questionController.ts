import type { Request, Response } from "express";
import { QuestionService } from "../services/questionService/questionService.js";
import { QuestionServiceImpl } from "../services/questionService/impl/questionServiceImpl.js";
import { logger } from "../utils/logger/logger.js";
import { CreateQuestionDTO, QuestionDTO, UpdateQuestionDTO } from "../dto/questionDTO.js";

export class QuestionController {
  private readonly questionService: QuestionService;

  constructor() {
    this.questionService = new QuestionServiceImpl();
  }

  getQuestionsByQuestionnaireId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.questionnaireId);

      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }
      const questions =
        await this.questionService.findQuestionByQuestionnaireId(
          questionnaireId,
        );

      if (!questions) {
        res.status(404).json({ error: "Questions not found" });
        return;
      }

      const questionsDTO: QuestionDTO[] = questions.map((question) => ({
        id: question.id,
        value: question.value,
        order: question.order,
        required: question.required,
        type: question.type,
        questionnaireId: question.questionnaire.id,
        createdBy: question.createdBy.id,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      }));
      res.status(200).json(questionsDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all questions");
      res.status(500).json({ error: error.message });
    }
  };

  createQuestionsByQuestionnaireId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.questionnaireId);
      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }
      const data: CreateQuestionDTO = req.body;
      if (!data.value || !data.order || !data.required || !data.type) {
        res.status(400).json({
          error:
            "Missing required fields: value, order, required and type of question",
        });
        return;
      }

      const question =
        await this.questionService.createQuestionByQuestionnaireId(
          questionnaireId,
          data,
        );

      if (!question) {
        res.status(404).json({ error: "Question not found" });
        return;
      }

      const questionDTO: QuestionDTO = {
        id: question.id,
        value: question.value,
        order: question.order,
        required: question.required,
        type: question.type,
        questionnaireId: questionnaireId,
        createdBy: question.createdBy.id,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      };

      logger.info(
        { questionId: question.id, questionnaireId },
        "Question created",
      );
      res.status(201).json(questionDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create question");
      res.status(500).json({ error: error.message });
    }
  };

  deleteQuestionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const questionId = Number(req.params.id);
      if (Number.isNaN(questionId) || questionId <= 0) {
        res.status(400).json({ error: "Invalid Question ID" });
        return;
      }
      await this.questionService.removeQuestionById(questionId);
      logger.info({ questionId }, "Question deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete question by id.");
      res.status(500).json({ error: error.message });
    }
  };

  updateQuestionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const questionId = Number(req.params.id);
      if (Number.isNaN(questionId) || questionId <= 0) {
        res.status(400).json({ error: "Invalid Question ID" });
        return;
      }

      const data: UpdateQuestionDTO = req.body;

      const updateQuestion = await this.questionService.updateQuestionById(
        questionId,
        data,
      );

      if (!updateQuestion) {
        res.status(404).json({ error: "Question not found" });
        return;
      }

      const questionDTO: QuestionDTO = {
        id: updateQuestion.id,
        value: updateQuestion.value,
        order: updateQuestion.order,
        required: updateQuestion.required,
        type: updateQuestion.type,
        questionnaireId: updateQuestion.questionnaire.id,
        createdBy: updateQuestion.createdBy.id,
        createdAt: updateQuestion.createdAt,
        updatedAt: updateQuestion.updatedAt,
      };
      logger.info({ questionDTO }, "Question updated");
      res.status(200).json(questionDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all questions");
      res.status(500).json({ error: error.message });
    }
  };
}
