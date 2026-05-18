import { AppDataSource } from "../config/data-source.js";
import { Registration } from "../entity/registrationEntity.js";

export const RegistrationRepository = AppDataSource.getRepository(
  Registration,
).extend({
  async countByProject(projectId: number): Promise<number> {
    return this.count({
      where: { activity: { project: { id: projectId } } },
    });
  },

  async countDistinctUsersByProject(projectId: number): Promise<number> {
    const result = await this.createQueryBuilder("registration")
      .innerJoin("registration.activity", "activity")
      .select("COUNT(DISTINCT registration.email)", "count")
      .where("activity.projectId = :projectId", { projectId })
      .getRawOne<{ count: string }>();

    return Number(result?.count ?? 0);
  },
});
