export enum MeetingState {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface Meeting {
  id: number;
  title: string;
  description?: string;
  date: string;
  location?: string;
  agenda?: string;
  minutes?: string;
  state: MeetingState;
  projectId: number;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMeeting {
  title: string;
  description?: string;
  date: string;
  location?: string;
  agenda?: string;
  projectId: number;
}

export interface UpdateMeeting {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  agenda?: string;
  minutes?: string;
  state?: MeetingState;
}
