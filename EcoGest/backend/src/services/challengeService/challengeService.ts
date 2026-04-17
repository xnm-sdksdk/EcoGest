import { Challenge } from "../../entity/challengeEntity.js";
import { Progress } from "../../entity/progressEntity.js";
import { ChallengeDTO } from "../../dto/challengeDTO.js";

export interface ChallengeService {
    updateChallengeProgress(challengeId: number, challengeDTO: ChallengeDTO): Promise<Challenge>;

    findMemberChallengeProgress(
        challengeId: number,
        userId: number,
    ): Promise<Progress | null>;
}
