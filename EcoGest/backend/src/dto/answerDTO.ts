export interface AnswerDTO {
  id: number;
  value: string;
  questionId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnswerDTO {
  value: string;
  questionId: number;
  userId: number;
  createdBy: number;
  createdAt: Date;
}

export interface UpdateAnswerDTO {
  value?: string;
  questionId?: number;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
}
