import { AppDataSource } from "../config/data-source.js";
import { Registration } from "../entity/registrationEntity.js";

export const RegistrationRepository = AppDataSource.getRepository(
    Registration,
).extend({});
