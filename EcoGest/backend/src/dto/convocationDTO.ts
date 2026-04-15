import { ConvocationState } from "../entity/convocationEntity.js";

export interface ConvocationDTO {
    id?: number;
    sentAt?: Date;
    state?: ConvocationState;
    userId: number;
    meetingId: number;
}