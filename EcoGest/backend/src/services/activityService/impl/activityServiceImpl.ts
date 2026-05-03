import {CreateActivityDTO, UpdateActivityDTO,} from "../../../dto/activityDTO.js";
import {Activity, ActivityState} from "../../../entity/activityEntity.js";
import {ActivityRepository} from "../../../repository/activityRepository.js";
import {ProjectRepository} from "../../../repository/projectRepository.js";
import {ActivityService} from "../activityService.js";
import {logger} from "../../../utils/logger/logger.js";

export class ActivityServiceImpl implements ActivityService {
  private readonly activityRepository: typeof ActivityRepository;
  private readonly projectRepository: typeof ProjectRepository;

  constructor() {
    this.activityRepository = ActivityRepository;
    this.projectRepository = ProjectRepository;
  }

  async findActivitiesByProjectId(projectId: number): Promise<Activity[]> {
    const projectExists = await this.projectRepository.existsBy({
      id: projectId,
    });
    if (!projectExists) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }
    return this.activityRepository.find({
      where: { project: { id: projectId } },
    });
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
    createActivityDTO: CreateActivityDTO,
  ): Promise<Activity> {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    const activity = this.activityRepository.create({
      ...createActivityDTO,
      project,
      state: ActivityState.PENDING,
    });
    return this.activityRepository.save(activity);
  }

  async updateActivityById(
    activityId: number,
    updateActivityDTO: UpdateActivityDTO,
  ): Promise<Activity | null> {
    const activity = await this.activityRepository.findOneBy({
      id: activityId,
    });
    if (!activity) {
      logger.warn({ activityId }, "Activity not found.");
      return null;
    }

    Object.assign(activity, updateActivityDTO);
    return await this.activityRepository.save(activity);
  }

  async removeActivityById(activityId: number): Promise<void> {
    if (!activityId) {
      logger.warn({ activityId }, "Invalid activity ID.");
      throw new Error("Activity ID not found.");
    }
    return await this.activityRepository.delete(activityId).then(() => {});
  }

  async approveActivityById(activityId: number): Promise<Activity | null> {
    const activity = await this.activityRepository.findOneBy({
      id: activityId,
    });
    if (!activity) {
      logger.warn({ activityId }, "Invalid activity ID.");
      return null;
    }

    if (activity.state !== ActivityState.PENDING) {
      logger.warn(
        { activityId },
        `Activity is not pending (current state: ${activity.state}).`,
      );
      throw new Error(
        `Activity is not pending (current state: ${activity.state}).`,
      );
    }

    return await this.activityRepository.save(activity);
  }

  async rejectActivityById(activityId: number): Promise<Activity | null> {
    const activity = await this.activityRepository.findOneBy({
      id: activityId,
    });
    if (!activity) {
      logger.warn({ activityId }, "Invalid activity ID.");
      return null;
    }

    if (activity.state !== ActivityState.PENDING) {
      logger.warn(
        { activityId },
        `Activity is not pending (current state: ${activity.state}).`,
      );
      throw new Error(
        `Activity is not pending (current state: ${activity.state}).`,
      );
    }

    activity.state = ActivityState.CANCELED;
    return await this.activityRepository.save(activity);
  }
}
