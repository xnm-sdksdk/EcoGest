import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Question } from "./questionEntity.js";
import { User } from "./userEntity.js";

@Entity()
export class Answer extends BaseEntity {
  @Column({ type: "text" })
  value!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "createdBy" })
  createdBy!: User | null;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "questionId" })
  question!: Question;
}
