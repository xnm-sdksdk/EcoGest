import { AppDataSource } from "../config/data-source.js";
import { Meeting } from "../entity/meetingEntity.js";

export const MeetingRepository = AppDataSource.getRepository(Meeting).extend(
    {},
);
