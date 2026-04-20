import { Proceedings } from "../../entity/proceedingsEntity.js";
import { ProceedingsDTO } from "../../dto/proceedingsDTO.js";

export interface ProceedingsService {
  findProceedingByMeetingId(meetingId: number): Promise<Proceedings | null>;

  addProceedingToMeeting(
    meetingId: number,
    proceedingDTO: ProceedingsDTO,
  ): Promise<Proceedings>;

  updateProceedingById(
    proceedingId: number,
    proceedingDTO: ProceedingsDTO,
  ): Promise<Proceedings>;
}
