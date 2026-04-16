import { Challenge } from "../../entity/challengeEntity.js";
import { Progress } from "../../entity/progressEntity.js";

export interface ChallengeService {
    updateChallengeProgress(challengeId: number): Promise<Challenge>;

    findMemberChallengeProgress(
        challengeId: number,
        userId: number,
    ): Promise<Progress | null>;
}
