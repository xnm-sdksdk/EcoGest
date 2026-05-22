import {
  AttendanceState,
  ConvocationState,
} from "../entity/convocationEntity.js";

export interface ConvocationDTO {
  id?: number;
  sentAt?: Date | null;
  state?: ConvocationState;
  attendance?: AttendanceState;
  meetingId?: number;
  recipientId: number;
  createdBy: number;
  updatedAt?: Date;
}

export interface CreateConvocationDTO {
  recipientId: number;
  createdBy: number;
}