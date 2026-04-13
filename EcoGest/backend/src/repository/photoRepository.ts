import { AppDataSource } from "../config/data-source.js";
import { Photo } from "../entity/photoEntity.js";

export const PhotoRepository = AppDataSource.getRepository(Photo).extend({});
