import { ActivityState } from "../entity/activityEntity.js";

export interface ActivityDTO {
  id: number;
  name: string;
  description: string;
  area: string;
  resources: string[];
  startDate: Date;
  endDate: Date;
  createdBy: number;
  state: ActivityState;
  updatedAt: Date;
}

export interface CreateActivityDTO {
  name: string;
  description: string;
  area: string;
  resources: string[];
  startDate: Date;
  endDate: Date;
  createdBy: number;
  state: ActivityState;
}

export interface UpdateActivityDTO {
  name?: string;
  description?: string;
  area?: string;
  resources?: string[];
  startDate?: Date;
  endDate?: Date;
  state: ActivityState;
  updatedAt: Date;
}
