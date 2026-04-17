import { MeetingService } from "../meetingService.js";
import { Meeting } from "../../../entity/meetingEntity.js";
import { MeetingRepository } from "../../../repository/meetingRepository.js";
import { MeetingDTO } from "../../../dto/meetingDTO.js";


export class MeetingServiceImpl implements  MeetingService {
  private meetingRepository: typeof MeetingRepository;

  constructor() {
    this.meetingRepository = MeetingRepository;
  }

  cancelMeetingById(meetingId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  createMeeting(projectId:  number, meetingDTO: MeetingDTO): Promise<Meeting> {
    return Promise.resolve(undefined);
  }

  deleteMeetingById(meetingId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  findMeetingByMeetingId(meetingId: number): Promise<Meeting> {
    return Promise.resolve(undefined);
  }

  findMeetingsByProjectId(projectId: number): Promise<Meeting[]> {
    return Promise.resolve([]);
  }

  updateMeetingById(meetingId: number, meetingDTO: MeetingDTO): Promise<void> {
    return Promise.resolve(undefined);
  }

}