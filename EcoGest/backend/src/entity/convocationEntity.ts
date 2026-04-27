import {Column, Entity, JoinColumn, ManyToOne, Unique} from "typeorm";
import {BaseEntity} from "./baseEntity.js";
import {Meeting} from "./meetingEntity.js";
import {User} from "./userEntity.js";

export enum ConvocationState {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}

export enum AttendanceState {
  PENDING = "pending",
  PRESENT = "present",
  ABSENT = "absent",
  EXCUSED = "excused",
}

@Entity()
@Unique(["meeting", "recipient"])
export class Convocation extends BaseEntity {
  @Column({ type: "timestamp", nullable: true })
  sentAt!: Date | null;

  @Column({
    type: "enum",
    enum: ConvocationState,
    default: ConvocationState.PENDING,
  })
  state!: ConvocationState;

  @Column({
    type: "enum",
    enum: AttendanceState,
    default: AttendanceState.PENDING,
  })
  attendance!: AttendanceState;

  @ManyToOne(() => Meeting, (meeting) => meeting.convocations)
  @JoinColumn({ name: "meetingId" })
  meeting!: Meeting;

  @ManyToOne(() => User)
  @JoinColumn({ name: "recipientId" })
  recipient!: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "createdBy" })
  createdBy!: User;
}
