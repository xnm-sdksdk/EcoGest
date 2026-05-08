export interface ProceedingsDTO {
  id?: number;
  content: string;
  createdBy: number;
  meetingId?: number;
  updatedAt?: Date;
}

export interface CreateProceedingsDTO {
  content: string;
  createdBy: number;
}

export interface UpdateProceedingsDTO {
  content?: string;
}