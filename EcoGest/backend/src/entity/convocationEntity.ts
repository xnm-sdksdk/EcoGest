import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Meeting } from "./meetingEntity.js";
import { User } from "./userEntity.js";


export enum ConvocationState {
    PENDING = "pending",
    SENT = "sent",
    FAILED = "failed",
}

@Entity()
export class Convocation extends BaseEntity {
    @Column({ type: "timestamp", nullable: true })
    sentAt!: Date | null;

    @Column({
        type: "enum",
        enum: ConvocationState,
        default: ConvocationState.PENDING,
    })
    state!: ConvocationState;

    @ManyToOne(() => Meeting, meeting => meeting.convocations)
    @JoinColumn({ name: "meetingId" })
    meeting!: Meeting;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;
}
