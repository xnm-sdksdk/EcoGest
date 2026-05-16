import {CreateLevelDTO, UpdateLevelDTO} from "../../../dto/levelDTO.js";
import {Level} from "../../../entity/levelEntity.js";
import {LevelRepository} from "../../../repository/levelRepository.js";
import {LevelService} from "../levelService.js";
import {logger} from "../../../utils/logger/logger.js";
import {ProjectRepository} from "../../../repository/projectRepository.js";

export class LevelServiceImpl implements LevelService {
  private readonly levelRepository: typeof LevelRepository;
  private readonly projectRepository: typeof ProjectRepository;

  constructor() {
    this.levelRepository = LevelRepository;
    this.projectRepository = ProjectRepository;
  }

  async findAllLevels(): Promise<Level[]> {
    return await this.levelRepository.find();
  }

  async findLevelsByProjectId(projectId: number): Promise<Level[] | null> {
    const projectExists = await this.projectRepository.existsBy({
      id: projectId,
    });

    if (!projectExists) {
      logger.warn({ projectId }, "Invalid project ID.");
      throw new Error(`Project with id ${projectId} not found.`);
    }

    return this.levelRepository.find({
      where: { projects: { id: projectId } },
      relations: ["projects"],
    });
  }

  async findLevelById(levelId: number): Promise<Level | null> {
    if (!levelId || levelId <= 0) {
      logger.warn({ levelId }, `Invalid Level ID: ${levelId}`);
      throw new Error(`Invalid Level ID: ${levelId}`);
    }
    return await this.levelRepository.findOneBy({ id: levelId });
  }

  async createLevel(createLevelDTO: CreateLevelDTO): Promise<Level> {
    const level = this.levelRepository.create({
      ...createLevelDTO,
    });
    if (!level) {
      throw new Error("Error creating level.");
    }
    return await this.levelRepository.save(level);
  }

  async updateLevelById(
    levelId: number,
    updateLevelDTO: UpdateLevelDTO,
  ): Promise<Level | null> {
    const level = await this.levelRepository.findOneBy({
      id: levelId,
    });
    if (!level) {
      logger.warn({ levelId }, "Level not found.");
      return null;
    }
    Object.assign(level, updateLevelDTO);
    return await this.levelRepository.save(level);
  }

  async removeLevelById(levelId: number): Promise<void> {
    if (!levelId || levelId <= 0) {
      logger.warn({ levelId }, `Invalid Level ID: ${levelId}`);
      throw new Error(`Invalid Level ID: ${levelId}`);
    }
    return await this.levelRepository.delete(levelId).then(() => {});
  }

  /*  async updateLevelByProjectId(
    projectId: number,
    updateLevelDTO: UpdateLevelDTO,
  ): Promise<Level | null> {
    return new Promise();
  }*/
}
