export interface ActivityDTO {
  id: number;
  name: string;
  description: string;
  area: string;
  resources: string[];
  startDate: Date;
  endDate: Date;
  createdBy: number;
}

export interface CreateActivityDTO {
  name: string;
  description: string;
  area: string;
  resources: string[];
  startDate: Date;
  endDate: Date;
  createdBy: number; // FIX
}

export interface UpdateActivityDTO {
  name?: string;
  description?: string;
  area?: string;
  resources?: string[];
  startDate?: Date;
  endDate?: Date;
}
