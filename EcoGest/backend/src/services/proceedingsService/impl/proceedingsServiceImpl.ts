import { ProceedingsService } from "../proceedingsService.js";
import {
  CreateProceedingsDTO,
  UpdateProceedingsDTO,
} from "../../../dto/proceedingsDTO.js";
import { Proceedings } from "../../../entity/proceedingsEntity.js";
import { ProceedingsRepository } from "../../../repository/proceedingsRepository.js";
import { MeetingRepository } from "../../../repository/meetingRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { logger } from "../../../utils/logger/logger.js";

export class ProceedingsServiceImpl implements ProceedingsService {
  private readonly proceedingsRepository: typeof ProceedingsRepository;
  private readonly meetingRepository: typeof MeetingRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.proceedingsRepository = ProceedingsRepository;
    this.meetingRepository = MeetingRepository;
    this.userRepository = UserRepository;
  }

  async findProceedingByMeetingId(
    meetingId: number,
  ): Promise<Proceedings | null> {
    if (!meetingId || meetingId <= 0) {
      logger.warn({ meetingId }, "Invalid Meeting ID.");
      throw new Error(`Invalid Meeting ID: ${meetingId}`);
    }

    return await this.proceedingsRepository.findOne({
      where: { meeting: { id: meetingId } },
      relations: {
        meeting: true,
        createdBy: true,
      },
    });
  }

  async addProceedingToMeeting(
    meetingId: number,
    proceedingDTO: CreateProceedingsDTO,
  ): Promise<Proceedings> {
    const meeting = await this.meetingRepository.findOneBy({ id: meetingId });

    if (!meeting) {
      logger.warn({ meetingId }, "Meeting not found.");
      throw new Error(`Meeting with id ${meetingId} not found.`);
    }

    const existingProceeding = await this.proceedingsRepository.findOne({
      where: { meeting: { id: meetingId } },
    });

    if (existingProceeding) {
      logger.warn({ meetingId }, "Meeting already has proceedings.");
      throw new Error(`Meeting with id ${meetingId} already has proceedings.`);
    }

    const user = await this.userRepository.findOneBy({
      id: proceedingDTO.createdBy,
    });

    if (!user) {
      logger.warn({ userId: proceedingDTO.createdBy }, "User not found.");
      throw new Error(`User with id ${proceedingDTO.createdBy} not found.`);
    }

    const proceeding = this.proceedingsRepository.create({
      content: proceedingDTO.content,
      meeting,
      createdBy: user,
    });

    return await this.proceedingsRepository.save(proceeding);
  }

  async updateProceedingById(
    proceedingId: number,
    proceedingDTO: UpdateProceedingsDTO,
  ): Promise<Proceedings | null> {
    const proceeding = await this.proceedingsRepository.findOne({
      where: { id: proceedingId },
      relations: {
        meeting: true,
        createdBy: true,
      },
    });

    if (!proceeding) {
      logger.warn({ proceedingId }, "Proceedings not found.");
      return null;
    }

    Object.assign(proceeding, proceedingDTO);
    return await this.proceedingsRepository.save(proceeding);
  }
}