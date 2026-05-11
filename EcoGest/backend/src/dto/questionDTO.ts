import { QuestionType } from "../entity/questionEntity.js";

export interface QuestionDTO {
  id: number;
  value: string;
  order: number;
  required: boolean;
  type: QuestionType;
  questionnaireId: number;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateQuestionDTO {
  value?: string;
  order?: number;
  required?: boolean;
  type?: QuestionType;
}

export interface CreateQuestionDTO {
  value: string;
  order?: number;
  required?: boolean;
  type: QuestionType;
}
