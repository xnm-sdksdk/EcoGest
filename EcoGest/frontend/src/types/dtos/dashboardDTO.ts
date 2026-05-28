export interface DashboardSummary {
  totalActivities: number;
  upcomingActivities: number;
  completedActivities: number;
  totalQuestionnaires: number;
  upcomingMeetings: number;
  activitiesByStatus: ActivityStatusCount[];
  totalRegistrations: number;
  totalParticipants: number;
  totalMeetings: number;
}

export interface ActivityStatusCount {
  state: string;
  count: number;
}
