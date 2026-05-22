import { Convocation } from "../../entity/convocationEntity.js";
import { CreateConvocationDTO } from "../../dto/convocationDTO.js";

export interface ConvocationService {
  findConvocationByMeetingId(meetingId: number): Promise<Convocation[]>;

  createMeetingConvocation(
    meetingId: number,
    convocationDTO: CreateConvocationDTO,
  ): Promise<Convocation>;

  resendMeetingConvocations(meetingId: number): Promise<Convocation[]>;
}