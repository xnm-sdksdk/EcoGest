import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/userEntity.js";

export const UserRepository = AppDataSource.getRepository(User).extend({});
