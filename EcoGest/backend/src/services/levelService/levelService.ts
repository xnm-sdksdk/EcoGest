import { CreateLevelDTO, UpdateLevelDTO } from "../../dto/levelDTO.js";
import { Level } from "../../entity/levelEntity.js";

export interface LevelService {
  findAllLevels(): Promise<Level[]>;

  findLevelById(levelId: number): Promise<Level | null>;

  createLevel(createLevelDTO: CreateLevelDTO): Promise<Level>;

  updateLevelById(
    levelId: number,
    updateLevelDTO: UpdateLevelDTO,
  ): Promise<Level | null>;

  removeLevelById(levelId: number): Promise<void | null>;

  findLevelsByProjectId(projectId: number): Promise<Level[] | null>;

  updateLevelByProjectId(
    projectId: number,
    updateLevelDTO: UpdateLevelDTO,
  ): Promise<Level | null>;
}
