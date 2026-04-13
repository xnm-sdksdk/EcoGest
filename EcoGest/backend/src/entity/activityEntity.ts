import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

export enum ActivityState {
    DRAFT = "draft",
    PENDING = "pending",
    APPROVED = "approved",
    ONGOING = "ongoing",
    COMPLETED = "completed",
    CANCELED = "canceled",
}

@Entity()
export class Activity extends BaseEntity {
    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    description!: string;

    @Column({ type: "varchar" })
    area!: string;

    @Column({ type: "varchar" })
    resources!: string;

    @Column({ type: "date" })
    startDate!: Date;

    @Column({ type: "date" })
    endDate!: Date;

    @Column({
        type: "enum",
        enum: ActivityState,
        default: ActivityState.PENDING,
    })
    state!: ActivityState;

    // TODO add relations
    @Column({ type: "int", nullable: true })
    projectId!: number;

    @Column({ type: "varchar", nullable: true })
    createdBy!: string;

    @Column({ type: "int", nullable: true })
    progressId!: number;

    @Column({ type: "int", nullable: true })
    photoId!: number;
}
