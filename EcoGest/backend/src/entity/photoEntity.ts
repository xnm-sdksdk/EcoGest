import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class Photo extends BaseEntity {
    @Column() // TODO
    executionId!: number;

    // TODO
    userId!: number;

    // TODO
    meetingId!: number;

    // TODO
    activityId!: number;
}
