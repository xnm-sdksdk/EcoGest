import { LevelDTO, UpdateLevelDTO } from "../../dto/levelDTO.js";
import { Level } from "../../entity/levelEntity.js";

export interface LevelService {
  findAllLevels(): Promise<Level[]>;

  findLevelById(levelId: number): Promise<Level | null>;

  createLevel(levelDTO: LevelDTO): Promise<Level>;

  updateLevelById(
    levelId: number,
    updateLevelDTO: UpdateLevelDTO,
  ): Promise<Level>;

  removeLevelById(levelId: number): Promise<void | null>;

  findLevelsByProjectId(projectId: number): Promise<Level[] | null>;

  updateLevelByProjectId(projectId: number, levelDTO: LevelDTO): Promise<Level>;
}
