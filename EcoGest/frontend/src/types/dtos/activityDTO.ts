export enum ActivityState {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface Activity {
  id: number;
  name: string;
  description: string;
  area: string;
  resources: string[];
  startDate: string;
  endDate: string;
  state: ActivityState;
  projectId: number;
  createdBy: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateActivity {
  name: string;
  description: string;
  area: string;
  resources: string[];
  startDate: string;
  endDate: string;
  projectId: number;
}

export interface UpdateActivity {
  name?: string;
  description?: string;
  area?: string;
  resources?: string[];
  startDate?: string;
  endDate?: string;
  state?: ActivityState;
}
