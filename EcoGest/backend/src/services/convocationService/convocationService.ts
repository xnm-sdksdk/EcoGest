import { Convocation } from "../../entity/convocationEntity.js";
import { ConvocationDTO } from "../../dto/convocationDTO.js";

export interface ConvocationService {
  findConvocationByMeetingId(meetingId: number): Promise<Convocation[]>;

  createMeetingsConvocation(
    meetingId: number,
    convocationDTO: ConvocationDTO,
  ): Promise<Convocation>;
}
