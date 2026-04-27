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
import { User } from "./userEntity.js";
import { Proceedings } from "./proceedingsEntity.js";
import { Convocation } from "./convocationEntity.js";

export enum MeetingState {
  SCHEDULED = "scheduled",
  CARRIED_OUT = "carried_out",
  CANCELED = "canceled",
}

@Entity()
export class Meeting extends BaseEntity {
  @Column({ type: "timestamp" })
  date!: Date;

  @Column({ type: "varchar" })
  location!: string;

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

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "createdBy" })
  createdBy!: User;

  @OneToMany(() => Photo, (photo) => photo.meeting)
  photos!: Photo[];

  @OneToOne(() => Proceedings, (proceedings) => proceedings.meeting, {
    nullable: true,
  })
  proceedings!: Proceedings | null;

  @OneToMany(() => Convocation, (convocation) => convocation.meeting)
  convocations!: Convocation[];
}
