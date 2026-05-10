export interface QuestionnaireDTO {
  id?: number;
  title: string;
  description?: string | null;
  state?: boolean;
  projectId?: number;
  createdBy: number;
  updatedAt?: Date;
}

export interface CreateQuestionnaireDTO {
  title: string;
  description?: string | null;
  createdBy: number;
}

export interface UpdateQuestionnaireDTO {
  title?: string;
  description?: string | null;
  state?: boolean;
}