import { LevelDTO } from "../../../dto/levelDTO.js";
import { Level } from "../../../entity/levelEntity.js";
import { LevelRepository } from "../../../repository/levelRepository.js";
import { LevelService } from "../levelService.js";
import { logger } from "../../../utils/logger/logger.js";

export class LevelServiceImpl implements LevelService {
  private readonly levelRepository: typeof LevelRepository;

  constructor() {
    this.levelRepository = LevelRepository;
  }

  async findAllLevels(): Promise<Level[]> {
    return await this.levelRepository.find();
  }

  async findLevelByProjectId(projectId: number): Promise<Level | null> {}

  async findLevelById(levelId: number): Promise<Level | null> {
    if (!levelId || levelId <= 0) {
      logger.warn({ levelId }, `Invalid Level ID: ${levelId}`);
      throw new Error(`Invalid Level ID: ${levelId}`);
    }
    return await this.levelRepository.findOneBy({ id: levelId });
  }

  async createLevel(levelDTO: LevelDTO): Promise<Level> {}

  async removeLevelById(levelId: number): Promise<void> {
    if (!levelId || levelId <= 0) {
      logger.warn({ levelId }, `Invalid Level ID: ${levelId}`);
      throw new Error(`Invalid Level ID: ${levelId}`);
    }
    return await this.levelRepository.delete(levelId).then(() => {});
  }

  async updateLevelByProjectId(
    projectId: number,
    levelDTO: LevelDTO,
  ): Promise<Level> {}

  async updateLevelById(levelDTO: LevelDTO): Promise<Level> {}
}
