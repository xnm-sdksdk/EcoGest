import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Photo } from "./photoEntity.js";
import { Project } from "./projectEntity.js";
import { User } from "./userEntity.js";

export enum MeetingState {
  SCHEDULED = "scheduled",
  CARRIED_OUT = "carried_out",
  CANCELED = "canceled",
}

export enum AttendanceState {
  PENDING = "pending",
  PRESENT = "present",
  ABSENT = "absent",
  EXCUSED = "excused",
}

@Entity()
export class Meeting extends BaseEntity {
  @Column({ type: "timestamp" })
  date!: Date;

  @Column({ type: "varchar", nullable: false })
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

  @OneToOne(() => Proceedings, (proceedings) => proceedings.meeting, {
    nullable: true,
  })
  proceedings!: Proceedings | null;

  @Column({
    type: "enum",
    enum: AttendanceState,
    default: AttendanceState.PENDING,
  })
  attendance!: AttendanceState;
}
