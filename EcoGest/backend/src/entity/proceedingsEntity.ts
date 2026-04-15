import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { User } from "./userEntity.js";
import { BaseEntity } from "./baseEntity.js";
import { Meeting } from "./meetingEntity.js";

@Entity()
export class Proceedings extends BaseEntity {
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "createdBy" })
    createdBy!: User | null;

    @Column({ type: "text" })
    content!: string;

    @OneToOne(() => Meeting, (meeting) => meeting.proceedings)
    @JoinColumn({ name: "meetingId" })
    meeting!: Meeting;
}
