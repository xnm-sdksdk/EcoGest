import { Questionnaire } from "../../entity/questionnaireEntity.js";
import {
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
} from "../../dto/questionnaireDTO.js";

export interface QuestionnaireService {
  findQuestionnairesByProjectId(projectId: number): Promise<Questionnaire[]>;

  findQuestionnaireById(questionnaireId: number): Promise<Questionnaire | null>;

  createQuestionnaire(
    projectId: number,
    questionnaireDTO: CreateQuestionnaireDTO,
  ): Promise<Questionnaire>;

  updateQuestionnaireById(
    questionnaireId: number,
    questionnaireDTO: UpdateQuestionnaireDTO,
  ): Promise<Questionnaire | null>;

  deleteQuestionnaireById(questionnaireId: number): Promise<void>;

  publishQuestionnaireById(
    questionnaireId: number,
  ): Promise<Questionnaire | null>;
}