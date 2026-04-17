import { ConvocationService } from "../convocationService.js";
import { ConvocationRepository } from "../../../repository/convocationRepository.js";
import { Convocation } from "../../../entity/convocationEntity.js";
import { ConvocationDTO } from "../../../dto/convocationDTO.js";


export class ConvocationServiceImpl implements ConvocationService {
  private convocationRepository: typeof ConvocationRepository;
  constructor() {
    this.convocationRepository = ConvocationRepository;
  }

  async createMeetingsConvocation(
    meetingId: number,
    convocationDTO: ConvocationDTO,
  ): Promise<Convocation> {
    return Promise.resolve(undefined);
  }

  async findConvocationByMeetingId(
    meetingId: number,
  ): Promise<Convocation[] | null> {
    return Promise.resolve(undefined);
  }
}