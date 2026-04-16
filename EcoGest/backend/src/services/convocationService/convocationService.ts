import { Convocation } from "../../entity/convocationEntity.js";

export interface ConvocationService {
    findConvocationByMeetingId(meetingId: number): Promise<Convocation[] | null>;

    createMeetingsConvocation(meetingId: number): Promise<Convocation>;
}
