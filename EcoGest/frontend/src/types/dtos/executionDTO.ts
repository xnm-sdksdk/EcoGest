export interface ExecutionDTO {
  id: number;
  date: string;
  location?: string;
  annotation?: string;
  activityId: number;
  createdBy: number;
  executedBy?: number | null;
  updatedAt?: string;
}

export interface CreateExecutionDTO {
  date: string;
  location?: string;
  annotation?: string;
  executedBy?: number;
}

export interface UpdateExecutionDTO {
  date?: string;
  location?: string;
  annotation?: string;
  executedBy?: number;
}
