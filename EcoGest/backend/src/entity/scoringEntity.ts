import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { User } from "./userEntity.js";
import { Project } from "./projectEntity.js";
import { Challenge } from "./challengeEntity.js";

@Entity()
export class Scoring extends BaseEntity {
  @Column({ type: "int" })
  points!: number;

  @Column({ type: "text" })
  reason!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @ManyToOne(() => Challenge, { nullable: true })
  @JoinColumn({ name: "challengeId" })
  challenge!: Challenge | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "createdBy" })
  createdBy!: User | null;
}
