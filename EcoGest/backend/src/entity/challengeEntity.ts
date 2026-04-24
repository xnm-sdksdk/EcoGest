import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Project } from "./projectEntity.js";
import { Progress } from "./progressEntity.js";
import { User } from "./userEntity.js";

@Entity()
export class Challenge extends BaseEntity {
  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "int" })
  targetActivities!: number;

  @Column({ type: "int" })
  rewardPoints!: number;

  @Column({ type: "date" })
  date!: Date;

  @ManyToOne(() => Project, (project) => project.challenges)
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @OneToMany(() => Progress, (progress) => progress.challenge)
  progress!: Progress[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "createdById" })
  createdBy!: User | null;
}
