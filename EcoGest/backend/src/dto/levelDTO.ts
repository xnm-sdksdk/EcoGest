export interface LevelDTO {
  id?: number;
  name: string;
  description: string;
  minActivities: number;
  minAreas: number;
  order: number;
}

export interface CreateLevelDTO {
  name: string;
  description: string;
  minActivities: number;
  minAreas: number;
  order: number;
}

export interface UpdateLevelDTO {
  name?: string;
  description?: string;
  minActivities?: number;
  minAreas?: number;
  order?: number;
}
