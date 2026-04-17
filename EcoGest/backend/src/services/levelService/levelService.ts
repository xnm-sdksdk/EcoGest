import { LevelDTO } from "../../dto/levelDTO.js";
import { Level } from "../../entity/levelEntity.js";

export interface LevelService {
  findAllLevels(): Promise<Level[]>;

  findLevelById(): Promise<Level>;

  createLevel(levelDTO: LevelDTO): Promise<Level>;

  updateLevelById(levelId: number, levelDTO: LevelDTO): Promise<Level>;

  removeLevelById(levelId: number): Promise<void>;

  findLevelByProjectId(projectId: number): Promise<Level | null>;

  updateLevelByProjectId(projectId: number, levelDTO: LevelDTO): Promise<Level>;
}
