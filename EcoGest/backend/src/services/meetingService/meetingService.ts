import { Meeting } from "../../entity/meetingEntity.js";
import { MeetingDTO } from "../../dto/meetingDTO.js";

export interface MeetingService {
  findMeetingsByProjectId(projectId: number): Promise<Meeting[]>;

  findMeetingByMeetingId(meetingId: number): Promise<Meeting | null>;

  createMeeting(projectId: number, meetingDTO: MeetingDTO): Promise<Meeting>;

  updateMeetingById(
    meetingId: number,
    meetingDTO: MeetingDTO,
  ): Promise<Meeting>;

  deleteMeetingById(meetingId: number): Promise<void | null>;

  cancelMeetingById(meetingId: number): Promise<void>;
}
