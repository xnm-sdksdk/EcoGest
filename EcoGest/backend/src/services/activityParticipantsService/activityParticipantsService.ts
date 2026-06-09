import { User } from "../../entity/userEntity.js";
import { ActivityParticipantDTO } from "../../dto/activityParticipantsDTO.js";

export interface ActivityParticipantService {
  findActivityParticipants(activityId: number): Promise<User[]>;

  addActivityParticipant(
    activityId: number,
    activityParticipantDTO: ActivityParticipantDTO,
  ): Promise<User>;

  removeActivityParticipant(
    activityId: number,
    userId: number,
  ): Promise<void>;
}