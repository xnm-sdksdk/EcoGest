import { CreateActivityDTO, UpdateActivityDTO } from "../../dto/activityDTO.js";
import { Activity } from "../../entity/activityEntity.js";

export interface ActivityService {
  findActivitiesByProjectId(projectId: number): Promise<Activity[]>;

  findActivityById(activityId: number): Promise<Activity | null>;

  createActivity(
    projectId: number,
    createActivityDTO: CreateActivityDTO,
  ): Promise<Activity>;

  updateActivityById(
    activityId: number,
    updateActivityDTO: UpdateActivityDTO,
  ): Promise<Activity>;

  removeActivityById(activityId: number): Promise<void | null>;

  approveActivityById(activityId: number): Promise<Activity>;

  rejectActivityById(activityId: number): Promise<Activity>;
}
