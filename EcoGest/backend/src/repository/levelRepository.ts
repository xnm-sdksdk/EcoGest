import { AppDataSource } from "../config/data-source.js";
import { Level } from "../entity/levelEntity.js";

export const LevelRepository = AppDataSource.getRepository(Level).extend({});
