export interface ExecutionDTO {
  id?: number;
  date: Date;
  location?: string | null;
  annotation?: string | null;
  activityId?: number;
  createdBy: number;
  executedBy?: number | null;
  updatedAt?: Date;
}

export interface CreateExecutionDTO {
  date: Date;
  location?: string | null;
  annotation?: string | null;
  createdBy: number;
  executedBy?: number | null;
}

export interface UpdateExecutionDTO {
  date?: Date;
  location?: string | null;
  annotation?: string | null;
  executedBy?: number | null;
}