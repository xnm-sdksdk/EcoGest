import { ActivityDTO } from "../../../dto/activityDTO.js";
import { Activity, ActivityState } from "../../../entity/activityEntity.js";
import { ActivityRepository } from "../../../repository/activityRepository.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { ActivityService } from "../activityService.js";
import { logger } from "../../../utils/logger/logger.js";

export class ActivityServiceImpl implements ActivityService {
  private readonly activityRepository: typeof ActivityRepository;
  private readonly projectRepository: typeof ProjectRepository;

  constructor() {
    this.activityRepository = ActivityRepository;
    this.projectRepository = ProjectRepository;
  }

  async findActivitiesByProject(projectId: number): Promise<Activity[]> {
    const project = await this.projectRepository.existsBy({ id: projectId });
    if (!project) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }
    return this.activityRepository.findBy({ id: projectId });
  }

  async findActivityById(activityId: number): Promise<Activity | null> {
    if (Number.isNaN(activityId) || activityId <= 0) {
      logger.warn({ activityId }, "Invalid activity ID.");
      throw new Error(`Activity with id ${activityId} not found.`);
    }
    return await this.activityRepository.findOneBy({ id: activityId });
  }

  async createActivity(
    projectId: number,
    activityDTO: ActivityDTO,
  ): Promise<Activity> {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    const activity = this.activityRepository.create({
      ...activityDTO,
      project,
      state: ActivityState.PENDING,
    });
    return this.activityRepository.save(activity);
  }

  async updateActivity(
    activityId: number,
    activityDTO: ActivityDTO,
  ): Promise<Activity> {
    if (!activityId) {
      logger.warn({ activityId }, "Invalid activity ID.");
      throw new Error("Activity ID not found.");
    }
    await this.activityRepository.update(activityId, activityDTO);

    const updated = await this.activityRepository.findOneBy({ id: activityId });
    if (!updated) {
      logger.warn({ activityId }, "Activity ID not found.");
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    return updated;
  }

  async removeActivity(activityId: number): Promise<void> {
    if (!activityId) {
      logger.warn({ activityId }, "Invalid activity ID.");
      throw new Error("Activity ID not found.");
    }
    return await this.activityRepository.delete(activityId).then(() => {});
  }

  async approveActivity(activityId: number): Promise<Activity> {
    if (!activityId) {
      logger.warn({ activityId }, "Invalid activity ID.");
      throw new Error("Activity ID not found.");
    }

    const approve = await this.activityRepository.findOneBy({ id: activityId });

    if (!approve) {
      logger.warn({ activityId }, "Activity ID not found.");
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    return approve;
  }

  async rejectActivity(activityId: number): Promise<Activity> {
    if (!activityId) {
      logger.warn({ activityId }, "Invalid activity ID.");
      throw new Error("Activity ID not found.");
    }

    const reject = await this.activityRepository.findOneBy({ id: activityId });

    if (!reject) {
      logger.warn({ activityId }, "Activity ID not found.");
      throw new Error(`Activity with id ${activityId} not found.`);
    }

    return reject;
  }
}
