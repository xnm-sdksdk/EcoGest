import { MeetingService } from "../meetingService.js";
import { Meeting, MeetingState } from "../../../entity/meetingEntity.js";
import { MeetingRepository } from "../../../repository/meetingRepository.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import {
  CreateMeetingDTO,
  UpdateMeetingDTO,
} from "../../../dto/meetingDTO.js";
import { logger } from "../../../utils/logger/logger.js";

export class MeetingServiceImpl implements MeetingService {
  private readonly meetingRepository: typeof MeetingRepository;
  private readonly projectRepository: typeof ProjectRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.meetingRepository = MeetingRepository;
    this.projectRepository = ProjectRepository;
    this.userRepository = UserRepository;
  }

  async findMeetingsByProjectId(projectId: number): Promise<Meeting[]> {
    const projectExists = await this.projectRepository.existsBy({ id: projectId });

    if (!projectExists) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    return await this.meetingRepository.find({
      where: { project: { id: projectId } },
      relations: {
        project: true,
        createdBy: true,
      },
    });
  }

  async findMeetingById(meetingId: number): Promise<Meeting | null> {
    if (!meetingId || meetingId <= 0) {
      logger.warn({ meetingId }, "Invalid Meeting ID.");
      throw new Error(`Invalid Meeting ID: ${meetingId}`);
    }

    return await this.meetingRepository.findOne({
      where: { id: meetingId },
      relations: {
        project: true,
        createdBy: true,
      },
    });
  }

  async createMeeting(
    projectId: number,
    meetingDTO: CreateMeetingDTO,
  ): Promise<Meeting> {
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) {
      logger.warn({ projectId }, "Project not found.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    const user = await this.userRepository.findOneBy({
      id: meetingDTO.createdBy,
    });

    if (!user) {
      logger.warn({ userId: meetingDTO.createdBy }, "User not found.");
      throw new Error(`User with id ${meetingDTO.createdBy} not found.`);
    }

    const meeting = this.meetingRepository.create({
      date: meetingDTO.date,
      location: meetingDTO.location,
      workOrder: meetingDTO.workOrder ?? null,
      state: MeetingState.SCHEDULED,
      project,
      createdBy: user,
    });

    return await this.meetingRepository.save(meeting);
  }

  async updateMeetingById(
    meetingId: number,
    meetingDTO: UpdateMeetingDTO,
  ): Promise<Meeting | null> {
    const meeting = await this.meetingRepository.findOneBy({ id: meetingId });

    if (!meeting) {
      logger.warn({ meetingId }, "Meeting not found.");
      return null;
    }

    Object.assign(meeting, meetingDTO);
    return await this.meetingRepository.save(meeting);
  }

  async deleteMeetingById(meetingId: number): Promise<void> {
    if (!meetingId || meetingId <= 0) {
      logger.warn({ meetingId }, "Invalid Meeting ID.");
      throw new Error("Meeting ID not found.");
    }

    await this.meetingRepository.delete(meetingId);
  }

  async cancelMeetingById(meetingId: number): Promise<Meeting | null> {
    const meeting = await this.meetingRepository.findOneBy({ id: meetingId });

    if (!meeting) {
      logger.warn({ meetingId }, "Meeting not found.");
      return null;
    }

    meeting.state = MeetingState.CANCELED;
    return await this.meetingRepository.save(meeting);
  }
}