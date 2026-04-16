import { Challenge } from "../../../entity/challengeEntity.js";
import { Progress } from "../../../entity/progressEntity.js";
import { ChallengeRepository } from "../../../repository/challengeRepository.js";
import { ChallengeService } from "../challengeService.js";

export class ChallengeServiceImpl implements ChallengeService {
    private challengeRepository: typeof ChallengeRepository;

    constructor() {
        this.challengeRepository = ChallengeRepository;
    }

    async findMemberChallengeProgress(
        challengeId: number,
        userId: number,
    ): Promise<Progress | null> { }

    async updateChallengeProgress(challengeId: number): Promise<Challenge> { }
}
