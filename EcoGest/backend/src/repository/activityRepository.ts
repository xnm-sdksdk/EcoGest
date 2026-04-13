import { AppDataSource } from "../config/data-source.js";
import { Activity } from "../entity/activityEntity.js";

export const ActivityRepository = AppDataSource.getRepository(Activity).extend(
    {},
);
