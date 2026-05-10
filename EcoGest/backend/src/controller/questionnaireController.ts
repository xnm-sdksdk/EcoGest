import type { Request, Response } from "express";
import type { QuestionnaireService } from "../services/questionnaireService/questionnaireService.js";
import { QuestionnaireServiceImpl } from "../services/questionnaireService/impl/questionnaireServiceImpl.js";
import {
  CreateQuestionnaireDTO,
  QuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from "../dto/questionnaireDTO.js";
import { logger } from "../utils/logger/logger.js";

export class QuestionnaireController {
  private readonly questionnaireService: QuestionnaireService;

  constructor() {
    this.questionnaireService = new QuestionnaireServiceImpl();
  }

  getProjectQuestionnaires = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const questionnaires =
        await this.questionnaireService.findQuestionnairesByProjectId(projectId);

      const questionnairesDTO: QuestionnaireDTO[] = questionnaires.map(
        (questionnaire) => ({
          id: questionnaire.id,
          title: questionnaire.title,
          description: questionnaire.description,
          state: questionnaire.state,
          projectId: questionnaire.project.id,
          createdBy: questionnaire.createdBy.id,
          updatedAt: questionnaire.updatedAt,
        }),
      );

      res.status(200).json(questionnairesDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get project questionnaires");
      res.status(500).json({ error: error.message });
    }
  };

  createQuestionnaire = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.id);

      if (Number.isNaN(projectId) || projectId <= 0) {
        res.status(400).json({ error: "Invalid Project ID" });
        return;
      }

      const data: CreateQuestionnaireDTO = req.body;

      if (!data.title || !data.createdBy) {
        res.status(400).json({
          error: "Missing required fields: title, createdBy",
        });
        return;
      }

      const questionnaire =
        await this.questionnaireService.createQuestionnaire(projectId, data);

      const questionnaireDTO: QuestionnaireDTO = {
        id: questionnaire.id,
        title: questionnaire.title,
        description: questionnaire.description,
        state: questionnaire.state,
        projectId: questionnaire.project.id,
        createdBy: questionnaire.createdBy.id,
        updatedAt: questionnaire.updatedAt,
      };

      logger.info(
        { questionnaireId: questionnaire.id },
        "Questionnaire created",
      );
      res.status(201).json(questionnaireDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to create questionnaire");
      res.status(500).json({ error: error.message });
    }
  };

  getQuestionnaireById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.id);

      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      const questionnaire =
        await this.questionnaireService.findQuestionnaireById(questionnaireId);

      if (!questionnaire) {
        res.status(404).json({ error: "Questionnaire not found" });
        return;
      }

      const questionnaireDTO: QuestionnaireDTO = {
        id: questionnaire.id,
        title: questionnaire.title,
        description: questionnaire.description,
        state: questionnaire.state,
        projectId: questionnaire.project.id,
        createdBy: questionnaire.createdBy.id,
        updatedAt: questionnaire.updatedAt,
      };

      res.status(200).json(questionnaireDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get questionnaire by id");
      res.status(500).json({ error: error.message });
    }
  };

  updateQuestionnaireById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.id);

      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      const data: UpdateQuestionnaireDTO = req.body;

      const updatedQuestionnaire =
        await this.questionnaireService.updateQuestionnaireById(
          questionnaireId,
          data,
        );

      if (!updatedQuestionnaire) {
        res.status(404).json({ error: "Questionnaire not found" });
        return;
      }

      const questionnaireDTO: QuestionnaireDTO = {
        id: updatedQuestionnaire.id,
        title: updatedQuestionnaire.title,
        description: updatedQuestionnaire.description,
        state: updatedQuestionnaire.state,
        projectId: updatedQuestionnaire.project.id,
        createdBy: updatedQuestionnaire.createdBy.id,
        updatedAt: updatedQuestionnaire.updatedAt,
      };

      logger.info({ questionnaireId }, "Questionnaire updated");
      res.status(200).json(questionnaireDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to update questionnaire");
      res.status(500).json({ error: error.message });
    }
  };

  deleteQuestionnaireById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.id);

      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      await this.questionnaireService.deleteQuestionnaireById(questionnaireId);

      logger.info({ questionnaireId }, "Questionnaire deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete questionnaire");
      res.status(500).json({ error: error.message });
    }
  };

  publishQuestionnaireById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const questionnaireId = Number(req.params.id);

      if (Number.isNaN(questionnaireId) || questionnaireId <= 0) {
        res.status(400).json({ error: "Invalid Questionnaire ID" });
        return;
      }

      const questionnaire =
        await this.questionnaireService.publishQuestionnaireById(
          questionnaireId,
        );

      if (!questionnaire) {
        res.status(404).json({ error: "Questionnaire not found" });
        return;
      }

      const questionnaireDTO: QuestionnaireDTO = {
        id: questionnaire.id,
        title: questionnaire.title,
        description: questionnaire.description,
        state: questionnaire.state,
        projectId: questionnaire.project.id,
        createdBy: questionnaire.createdBy.id,
        updatedAt: questionnaire.updatedAt,
      };

      logger.info({ questionnaireId }, "Questionnaire published");
      res.status(200).json(questionnaireDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to publish questionnaire");
      res.status(500).json({ error: error.message });
    }
  };
}