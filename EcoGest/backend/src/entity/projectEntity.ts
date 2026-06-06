import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Level } from "./levelEntity.js";
import { Meeting } from "./meetingEntity.js";
import { Questionnaire } from "./questionnaireEntity.js";
import { Challenge } from "./challengeEntity.js";
import { User } from "./userEntity.js";

@Entity()
export class Project extends BaseEntity {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  school!: string;

  @Column({ type: "varchar" })
  schoolYear!: string;

  @Column({ type: "boolean", default: true })
  state!: boolean;

  @ManyToOne(() => Level, (level) => level.projects, { nullable: true })
  @JoinColumn({ name: "levelId" })
  level!: Level | null;

  @OneToMany(() => Meeting, (meeting) => meeting.project)
  meeting!: Meeting[];

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.project)
  questionnaires!: Questionnaire[];

  @OneToMany(() => Challenge, (challenge) => challenge.project)
  challenges!: Challenge[];

  @ManyToMany(() => User, (user) => user.projects)
  members!: User[];
}
