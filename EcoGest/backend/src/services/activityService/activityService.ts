import { ActivityDTO } from "../../dto/activityDTO.js";
import { Activity } from "../../entity/activityEntity.js";

export interface ActivityService {
  findActivitiesByProject(projectId: number): Promise<Activity[]>;

  findActivityById(activityId: number): Promise<Activity | null>;

  createActivity(
    projectId: number,
    activityDTO: ActivityDTO,
  ): Promise<Activity>;

  updateActivity(
    activityId: number,
    activityDTO: ActivityDTO,
  ): Promise<Activity>;

  removeActivity(activityId: number): Promise<void>;

  approveActivity(activityId: number): Promise<Activity>;

  rejectActivity(activityId: number): Promise<Activity>;
}
