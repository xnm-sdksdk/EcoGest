import { QuestionType } from "../entity/questionEntity.js";

export interface QuestionDTO {
    id?: number;
    value: string;
    order: number;
    required: boolean;
    type: QuestionType;
    questionnaireId: number;
}