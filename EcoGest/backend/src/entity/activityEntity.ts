import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Project } from "./projectEntity.js";
import { User } from "./userEntity.js";
import { Registration } from "./registrationEntity.js";
import { Execution } from "./executionEntity.js";

export enum ActivityState {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

@Entity()
export class Activity extends BaseEntity {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  description!: string;

  @Column({ type: "varchar" })
  area!: string;

  @Column({ type: "jsonb" })
  resources!: string[];

  @Column({ type: "date" })
  startDate!: Date;

  @Column({ type: "date" })
  endDate!: Date;

  @Column({
    type: "enum",
    enum: ActivityState,
    default: ActivityState.PENDING,
  })
  state!: ActivityState;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "createdBy" })
  createdBy!: User | null;

  @OneToMany(() => Registration, (registration) => registration.activity)
  registrations!: Registration[];

  @OneToOne(() => Execution, (execution) => execution.activity, {
    nullable: true,
  })
  execution!: Execution | null;
}
