import { MeetingState } from "../entity/meetingEntity.js";

export interface MeetingDTO {
  id?: number;
  title: string;
  date: Date;
  location: string;
  workOrder?: string | null;
  state?: MeetingState;
  createdBy: number;
  updatedAt?: Date;
}

export interface CreateMeetingDTO {
  title: string;
  date: Date;
  location: string;
  workOrder?: string | null;
  createdBy: number;
}

export interface UpdateMeetingDTO {
  date?: Date;
  location?: string;
  workOrder?: string | null;
  state?: MeetingState;
}
