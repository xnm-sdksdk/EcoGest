import { AppDataSource } from "../config/data-source.js";
import { Proceedings } from "../entity/proceedingsEntity.js";

export const ProceedingsRepository = AppDataSource.getRepository(
    Proceedings,
).extend({});
