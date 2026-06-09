import { ActivityParticipantService } from "../activityParticipantsService.js";
import { ActivityRepository } from "../../../repository/activityRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { User } from "../../../entity/userEntity.js";
import { ActivityParticipantDTO } from "../../../dto/activityParticipantsDTO.js";
import { logger } from "../../../utils/logger/logger.js";

export class ActivityParticipantServiceImpl
  implements ActivityParticipantService
{
  private readonly activityRepository: typeof ActivityRepository;
  private readonly userRepository: typeof UserRepository;

  constructor() {
    this.activityRepository = ActivityRepository;
    this.userRepository = UserRepository;
  }

  async findActivityParticipants(
    activityId: number,
  ): Promise<User[]> {
    const activity = await this.activityRepository.findOne({
      where: { id: activityId },
      relations: {
        participants: true,
      },
    });

    if (!activity) {
      logger.warn({ activityId }, "Activity not found.");
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    return activity.participants;
  }

  async addActivityParticipant(
    activityId: number,
    activityParticipantDTO: ActivityParticipantDTO,
  ): Promise<User> {
    const activity = await this.activityRepository.findOne({
      where: { id: activityId },
      relations: {
        participants: true,
      },
    });

    if (!activity) {
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    const user = await this.userRepository.findOneBy({
      id: activityParticipantDTO.userId,
    });

    if (!user) {
      throw new Error(
        `User with id ${activityParticipantDTO.userId} not found.`,
      );
    }

    activity.participants.push(user);

    await this.activityRepository.save(activity);

    return user;
  }

  async removeActivityParticipant(
    activityId: number,
    userId: number,
  ): Promise<void> {
    const activity = await this.activityRepository.findOne({
      where: { id: activityId },
      relations: {
        participants: true,
      },
    });

    if (!activity) {
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    activity.participants = activity.participants.filter(
      (participant) => participant.id !== userId,
    );

    await this.activityRepository.save(activity);
  }
}