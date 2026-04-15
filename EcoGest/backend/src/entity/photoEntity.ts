import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Meeting } from "./meetingEntity.js";
import { User } from "./userEntity.js";
import { Execution } from "./executionEntity.js";

@Entity()
export class Photo extends BaseEntity {
    @Column({ type: "varchar" })
    path!: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "userId" })
    user!: User | null;

    @ManyToOne(() => Execution, execution => execution.photos, { nullable: true })
    @JoinColumn({ name: "executionId" })
    execution!: Execution | null;

    @ManyToOne(() => Meeting, meeting => meeting.photos, { nullable: true })
    @JoinColumn({ name: "meetingId" })
    meeting!: Meeting | null;
}
