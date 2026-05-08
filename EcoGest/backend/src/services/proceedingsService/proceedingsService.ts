import { Proceedings } from "../../entity/proceedingsEntity.js";
import {
  CreateProceedingsDTO,
  UpdateProceedingsDTO,
} from "../../dto/proceedingsDTO.js";

export interface ProceedingsService {
  findProceedingByMeetingId(meetingId: number): Promise<Proceedings | null>;

  addProceedingToMeeting(
    meetingId: number,
    proceedingDTO: CreateProceedingsDTO,
  ): Promise<Proceedings>;

  updateProceedingById(
    proceedingId: number,
    proceedingDTO: UpdateProceedingsDTO,
  ): Promise<Proceedings | null>;
}