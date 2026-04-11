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
    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    area!: string;

    @Column()
    resources!: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column({
        type: "enum",
        enum: ActivityState,
        default: ActivityState.PENDING,
    })
    state!: ActivityState;

    // TODO
    // @Column()
    // projectId!: number;

    @Column()
    createdBy!: string;

    // TODO
    // @Column()
    // progressId!: number;

    // TODO
    // @Column()
    // photoId!: number;
}
