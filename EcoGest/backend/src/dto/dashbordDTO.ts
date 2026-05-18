export interface DashboardDTO {
  projectId?: number;
  projectName?: string;
  totalActivities?: number;
  activitiesByStatus?: { state: string; count: number }[];
  upcomingActivities?: number;
  completedActivities?: number;
  totalParticipants?: number;
  totalRegistrations?: number;
  totalMeetings?: number;
  upcomingMeetings?: number;
  totalPointsAwarded?: number;
  topUsers?: { userId: string; name: string; points: number }[];
  totalQuestionnaires?: number;
  totalResponses?: number;
}
