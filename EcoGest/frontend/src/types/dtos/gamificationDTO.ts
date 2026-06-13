export interface ScoringDTO {
  id: number;
  points: number;
  reason: string | null;
  userId: number;
  userName: string;
  challengeId: number | null;
  createdAt: Date;
}

export interface RankingDTO {
  userId: number;
  userName: string;
  totalPoints: number;
}
