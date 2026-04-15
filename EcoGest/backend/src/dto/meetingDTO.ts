import { MeetingState } from "../entity/meetingEntity.js";

export interface MeetingDTO {
    id?: number;
    date: Date;
    location?: string;
    workOrder?: string;
    state?: MeetingState;
}
