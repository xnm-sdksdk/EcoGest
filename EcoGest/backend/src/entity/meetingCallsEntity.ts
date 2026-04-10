import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

export enum MeetingCallEnum {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed",
}

@Entity()
export class MeetingCalls extends BaseEntity {
    @Column()
    sentAt!: Date;

    @Column({
        type: "enum",
        enum: MeetingCallEnum,
        default: MeetingCallEnum.PENDING,
    })
    state!: MeetingCallEnum;

    // TODO
    meetingId!: number;

    // TODO
    projectId!: number;

    @Column()
    participants!: number;
}
