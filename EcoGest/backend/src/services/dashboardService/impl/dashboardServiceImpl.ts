import { DashboardService } from "../dashboardService.js";
import { DashboardDTO } from "../../../dto/dashbordDTO.js";
import { ProjectRepository } from "../../../repository/projectRepository.js";
import { ActivityRepository } from "../../../repository/activityRepository.js";
import { logger } from "../../../utils/logger/logger.js";
import { MeetingRepository } from "../../../repository/meetingRepository.js";
import { RegistrationRepository } from "../../../repository/registrationRepository.js";
import { UserRepository } from "../../../repository/userRepository.js";
import { QuestionnaireRepository } from "../../../repository/questionnaireRepository.js";
import { MoreThan } from "typeorm";
import { ActivityState } from "../../../entity/activityEntity.js";

export class DashboardServiceImpl implements DashboardService {
  private readonly projectRepository: typeof ProjectRepository;
  private readonly activityRepository: typeof ActivityRepository;
  private readonly meetingRepository: typeof MeetingRepository;
  private readonly registrationRepository: typeof RegistrationRepository;
  private readonly userRepository: typeof UserRepository;
  private readonly questionnaireRepository: typeof QuestionnaireRepository;

  constructor() {
    this.projectRepository = ProjectRepository;
    this.activityRepository = ActivityRepository;
    this.meetingRepository = MeetingRepository;
    this.registrationRepository = RegistrationRepository;
    this.userRepository = UserRepository;
    this.questionnaireRepository = QuestionnaireRepository;
  }

  async findMetricsByProjectId(projectId: number): Promise<DashboardDTO> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    const now = new Date();

    const [
      totalActivities,
      upcomingActivities,
      completedActivities,
      totalQuestionnaires,
      upcomingMeetings,
      activitiesByStatus,
      totalRegistrations,
      totalParticipants,
      totalMeetings,
    ] = await Promise.all([
      this.activityRepository.count({ where: { project: { id: projectId } } }),
      this.activityRepository.count({
        where: { id: projectId, startDate: MoreThan(now) },
      }),
      this.activityRepository.count({
        where: { id: projectId, state: ActivityState.COMPLETED },
      }),
      this.questionnaireRepository.count({ where: { id: projectId } }),
      this.meetingRepository.count({
        where: { id: projectId, date: MoreThan(now) },
      }),
      this.activityRepository.countByStatusForProject(projectId),
      this.registrationRepository.countByProject(projectId),
      this.registrationRepository.countDistinctUsersByProject(projectId),
      this.meetingRepository.count({ where: { id: projectId } }),
      /*
      this.activityRepository.sumPointsForProject(projectId),
      this.userRepository.findTopByProjectPoints(projectId, 5),
      this.questionnaireRepository.countResponsesByProject(projectId),*/
    ]);

    return {
      projectId,
      projectName: project.name,
      totalActivities,
      upcomingActivities,
      completedActivities,
      totalQuestionnaires,
      upcomingMeetings,
      activitiesByStatus,
      totalRegistrations,
      totalParticipants,
      totalMeetings,
    };
  }

  /*  findMonthlyMetricsByProjectId(_projectId: number): Promise<DashboardDTO> {
    return Promise.resolve(undefined);
  }*/
}
