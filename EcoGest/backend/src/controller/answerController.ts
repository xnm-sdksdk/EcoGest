import type { Request, Response } from "express";
import { AnswerService } from "../services/answerService/answerService.js";
import { AnswerServiceImpl } from "../services/answerService/impl/answerServiceImpl.js";
import { logger } from "../utils/logger/logger.js";
import { AnswerDTO, CreateAnswerDTO } from "../dto/answerDTO.js";

export class AnswerController {
  private readonly answerService: AnswerService;

  constructor() {
    this.answerService = new AnswerServiceImpl();
  }

  createAnswerByQuestionnaireId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.questionnaireId);

      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      const data: CreateAnswerDTO = req.body;

      if (!data.value) {
        res.status(400).json({
          error: "Missing required field: value",
        });
        return;
      }

      const answer = await this.answerService.submitAnswers(
        questionnaireId,
        data,
      );

      if (!answer) {
        res.status(404).json({ error: "Answer not found" });
        return;
      }

      const answerDTO: AnswerDTO = {
        id: answer.id,
        value: answer.value,
        questionId: answer.question.id,
        userId: answer.createdBy.id,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      };

      logger.info({ id: answer.id, questionnaireId }, "Answer created");
      res.status(201).json(answerDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create answer");
      res.status(500).json({ error: error.message });
    }
  };

  getAnswerByQuestionnaireId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.questionnaireId);
      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      const answers =
        await this.answerService.findQuestionnaireAnswers(questionnaireId);

      if (!answers) {
        res.status(404).json({ error: "Answers not found" });
        return;
      }
      const answersDTO: AnswerDTO[] = answers.map((answer) => ({
        id: answer.id,
        value: answer.value,
        createdAt: answer.createdAt,
        questionId: answer.question.id,
        userId: answer.createdBy.id,
        updatedAt: answer.updatedAt,
      }));

      res.status(200).json(answersDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get answers by questionnaire id");
      res.status(500).json({ error: error.message });
    }
  };

  getAnswerResultsByQuestionnaireId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.questionnaireId);
      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      const answers =
        await this.answerService.findQuestionnaireAnswerResults(
          questionnaireId,
        );

      if (!answers) {
        res.status(404).json({ error: "Answers not found" });
        return;
      }

      const answerDTO: AnswerDTO[] = answers.map((answer) => ({
        id: answer.id,
        value: answer.value,
        createdAt: answer.createdAt,
        questionId: answer.questionId,
        userId: answer.userId,
        updatedAt: answer.updatedAt,
      }));
      res.status(200).json(answerDTO);
    } catch (error: any) {
      logger.error(
        { err: error },
        "Failed to get answers results by questionnaire id",
      );
      res.status(500).json({ error: error.message });
    }
  };
}
