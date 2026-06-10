import { Meeting } from "../../entity/meetingEntity.js";
import { CreateMeetingDTO, UpdateMeetingDTO } from "../../dto/meetingDTO.js";

export interface MeetingService {
  findMeetingsByProjectId(projectId: number): Promise<Meeting[]>;

  findMeetingById(meetingId: number): Promise<Meeting | null>;

  createMeeting(
    projectId: number,
    meetingDTO: CreateMeetingDTO,
    userId: number,
  ): Promise<Meeting>;

  updateMeetingById(
    meetingId: number,
    meetingDTO: UpdateMeetingDTO,
  ): Promise<Meeting | null>;

  deleteMeetingById(meetingId: number): Promise<void>;

  cancelMeetingById(meetingId: number): Promise<Meeting | null>;
}
