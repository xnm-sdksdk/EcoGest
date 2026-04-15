import { LevelDTO } from "../../../dto/levelDTO.js";
import { Level } from "../../../entity/levelEntity.js";
import { LevelRepository } from "../../../repository/levelRepository.js";
import { LevelService } from "../levelService.js";

export class LevelServiceImpl implements LevelService {
    private levelRepository: typeof LevelRepository;

    constructor() {
        this.levelRepository = LevelRepository;
    }

    async findAllLevels(): Promise<Level[]> { }

    async findLevelByProjectId(projectId: number): Promise<Level | null> { }

    async findLevelById(): Promise<Level> { }

    async createLevel(levelDTO: LevelDTO): Promise<Level> { }

    async removeLevelById(levelId: number): Promise<void> { }

    async updateLevelByProjectId(projectId: number, levelDTO: LevelDTO): Promise<Level> {

    }

    async updateLevelById(levelDTO: LevelDTO): Promise<Level> {

    }
}
