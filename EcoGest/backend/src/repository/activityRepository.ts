import { AppDataSource } from "../config/data-source.js";
import { Activity } from "../entity/activityEntity.js";

export const ActivityRepository = AppDataSource.getRepository(Activity).extend({
  async countByStatusForProject(
    projectId: number,
  ): Promise<{ state: string; count: number }[]> {
    const result = await this.createQueryBuilder("activity")
      .select("activity.state", "state")
      .addSelect("COUNT(*)", "count")
      .where("activity.projectId = :projectId", { projectId })
      .groupBy("activity.state")
      .getRawMany<{ state: string; count: number }>();

    return result.map((r) => ({ state: r.state, count: Number(r.count) }));
  },
});
