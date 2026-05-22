import { ConvocationService } from "../convocationService.js";
import { ConvocationRepository } from "../../../repository/convocationRepository.js";
import { Convocation, ConvocationState } from "../../../entity/convocationEntity.js";
import { CreateConvocationDTO } from "../../../dto/convocationDTO.js";
import { MeetingRepository } from "../../../repository/meetingRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { logger } from "../../../utils/logger/logger.js";

export class ConvocationServiceImpl implements ConvocationService {
  private readonly convocationRepository: typeof ConvocationRepository;
  private readonly meetingRepository: typeof MeetingRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.convocationRepository = ConvocationRepository;
    this.meetingRepository = MeetingRepository;
    this.userRepository = UserRepository;
  }

  async findConvocationByMeetingId(meetingId: number): Promise<Convocation[]> {
    const meetingExists = await this.meetingRepository.existsBy({ id: meetingId });

    if (!meetingExists) {
      logger.warn({ meetingId }, "Meeting not found.");
      throw new Error(`Meeting with id ${meetingId} not found.`);
    }

    return await this.convocationRepository.find({
      where: { meeting: { id: meetingId } },
      relations: {
        meeting: true,
        recipient: true,
        createdBy: true,
      },
    });
  }

  async createMeetingConvocation(
    meetingId: number,
    convocationDTO: CreateConvocationDTO,
  ): Promise<Convocation> {
    const meeting = await this.meetingRepository.findOneBy({ id: meetingId });

    if (!meeting) {
      logger.warn({ meetingId }, "Meeting not found.");
      throw new Error(`Meeting with id ${meetingId} not found.`);
    }

    const recipient = await this.userRepository.findOneBy({
      id: convocationDTO.recipientId,
    });

    if (!recipient) {
      logger.warn({ userId: convocationDTO.recipientId }, "Recipient not found.");
      throw new Error(`User with id ${convocationDTO.recipientId} not found.`);
    }

    const createdBy = await this.userRepository.findOneBy({
      id: convocationDTO.createdBy,
    });

    if (!createdBy) {
      logger.warn({ userId: convocationDTO.createdBy }, "Creator not found.");
      throw new Error(`User with id ${convocationDTO.createdBy} not found.`);
    }

    const existingConvocation = await this.convocationRepository.findOne({
      where: {
        meeting: { id: meetingId },
        recipient: { id: convocationDTO.recipientId },
      },
    });

    if (existingConvocation) {
      throw new Error("Convocation already exists for this meeting and recipient.");
    }

    const convocation = this.convocationRepository.create({
      meeting,
      recipient,
      createdBy,
      state: ConvocationState.PENDING,
    });

    return await this.convocationRepository.save(convocation);
  }

  async resendMeetingConvocations(meetingId: number): Promise<Convocation[]> {
    const convocations = await this.findConvocationByMeetingId(meetingId);

    const updatedConvocations = convocations.map((convocation) => {
      convocation.sentAt = new Date();
      convocation.state = ConvocationState.SENT;
      return convocation;
    });

    return await this.convocationRepository.save(updatedConvocations);
  }
}