import { ProceedingsService } from "../proceedingsService.js";
import { ProceedingsDTO } from "../../../dto/proceedingsDTO.js";
import { Proceedings } from "../../../entity/proceedingsEntity.js";
import { ProceedingsRepository } from "../../../repository/proceedingsRepository.js";

export class ProceedingsServiceImpl implements ProceedingsService {
  private proceedingsRepository: typeof ProceedingsRepository;

  constructor() {
    this.proceedingsRepository = ProceedingsRepository;
  }

  addProceedingToMeeting(
    meetingId: number,
    proceedingDTO: ProceedingsDTO,
  ): Promise<Proceedings> {
    return Promise.resolve(undefined);
  }

  findProceedingByMeetingId(meetingId: number): Promise<Proceedings | null> {
    return Promise.resolve(undefined);
  }

  updateProceedingById(
    proceedingId: number,
    proceedingDTO: ProceedingsDTO,
  ): Promise<Proceedings> {
    return Promise.resolve(undefined);
  }
}
