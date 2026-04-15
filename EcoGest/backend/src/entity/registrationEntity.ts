import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Activity } from "./activityEntity.js";

@Entity()
export class Registration extends BaseEntity {
    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    email!: string;

    @Column({ type: "varchar", nullable: true })
    cancelToken!: string | null;

    @ManyToOne(() => Activity, activity => activity.inscriptions)
    @JoinColumn({ name: "activityId" })
    activity!: Activity;

}
