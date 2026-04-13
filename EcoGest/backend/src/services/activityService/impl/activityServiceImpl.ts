import { ActivityDTO } from "../../../dto/activityDTO.js";
import { Activity, ActivityState } from "../../../entity/activityEntity.js";
import { ActivityRepository } from "../../../repository/activityRepository.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { ActivityService } from "../activityService.js";

export class ActivityServiceImpl implements ActivityService {
    private activityRepository: typeof ActivityRepository;
    private projectRepository: typeof ProjectRepository;

    constructor() {
        this.activityRepository = ActivityRepository;
        this.projectRepository = ProjectRepository;
    }

    async findActivitiesByProject(projectId: number): Promise<Activity[]> {
        const project = await this.projectRepository.existsBy({ id: projectId });
        if (!project) {
            throw new Error(`Project with id ${projectId} not found.`);
        }
        return this.activityRepository.findBy({ projectId });
    }

    async findActivityById(activityId: number): Promise<Activity | null> {
        const activity = await this.activityRepository.findOneBy({
            id: activityId,
        });
        if (!activity) {
            throw new Error(`Activity with id ${activityId} not found.`);
        }
        return activity;
    }

    async createActivity(
        projectId: number,
        activityDTO: ActivityDTO,
    ): Promise<Activity> {
        const project = await this.projectRepository.existsBy({ id: projectId });
        if (!project) {
            throw new Error(`Project with id ${projectId} not found.`);
        }

        const activity = this.activityRepository.create({
            ...activityDTO,
            projectId,
            state: ActivityState.PENDING,
        });
        return this.activityRepository.save(activity);
    }

    updateActivity(
        activityId: number,
        activityDTO: ActivityDTO,
    ): Promise<Activity> { }

    async removeActivity(activityId: number): Promise<void> {
        if (!activityId) {
            throw new Error("Activity ID not found.");
        }
        await this.activityRepository.delete(activityId);
    }

    approveActivity(activityId: number): Promise<Activity> { }

    rejectActivity(activityId: number): Promise<Activity> { }
}
