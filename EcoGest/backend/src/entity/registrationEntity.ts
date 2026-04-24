import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Activity } from "./activityEntity.js";

export enum RegistrationState {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

@Entity()
@Unique(["email", "activity"])
export class Registration extends BaseEntity {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  cancelToken!: string | null;

  @Column({
    type: "enum",
    enum: RegistrationState,
    default: RegistrationState.PENDING,
  })
  state!: RegistrationState;

  @ManyToOne(() => Activity, (activity) => activity.registrations)
  @JoinColumn({ name: "activityId" })
  activity!: Activity;
}
