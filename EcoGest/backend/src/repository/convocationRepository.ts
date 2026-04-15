import { AppDataSource } from "../config/data-source.js";
import { Convocation } from "../entity/convocationEntity.js";

export const ConvocationRepository = AppDataSource.getRepository(
    Convocation,
).extend({});
