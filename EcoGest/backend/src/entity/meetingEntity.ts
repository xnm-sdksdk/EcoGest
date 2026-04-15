import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Photo } from "./photoEntity.js";
import { Project } from "./projectEntity.js";
import { Proceedings } from "./proceedingsEntity.js";
import { User } from "./userEntity.js";
import { Convocation } from "./convocationEntity.js";

export enum MeetingState {
    SCHEDULED = "scheduled",
    CARRIED_OUT = "carried_out",
    CANCELED = "canceled",
}

@Entity()
export class Meeting extends BaseEntity {
    @Column({ type: "date" })
    date!: Date;

    @Column({ type: "varchar", nullable: true })
    location!: string | null;

    @Column({ type: "text", nullable: true })
    workOrder!: string | null;

    @Column({
        type: "enum",
        enum: MeetingState,
        default: MeetingState.SCHEDULED,
    })
    state!: MeetingState;

    @ManyToOne(() => Project, (project) => project.meeting)
    @JoinColumn({ name: "projectId" })
    project!: Project;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "createdBy" })
    createdBy!: User | null;

    @OneToMany(() => Photo, (photo) => photo.meeting)
    photos!: Photo[];

    @OneToOne(() => Proceedings, { nullable: true })
    @JoinColumn({ name: "proceedingsId" })
    proceedings!: Proceedings | null;

    @OneToMany(() => Convocation, (convocation) => convocation.meeting)
    convocations!: Convocation[];
}
