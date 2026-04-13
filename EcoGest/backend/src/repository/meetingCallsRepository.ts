import { AppDataSource } from "../config/data-source.js";
import { MeetingCalls } from "../entity/meetingCallsEntity.js";

export const MeetingCallsRepository = AppDataSource.getRepository(
    MeetingCalls,
).extend({});
