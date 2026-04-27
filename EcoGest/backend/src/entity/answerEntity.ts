import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Question } from "./questionEntity.js";
import { User } from "./userEntity.js";

@Entity()
export class Answer extends BaseEntity {
  @Column({ type: "text" })
  value!: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "createdBy" })
  createdBy!: User;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "questionId" })
  question!: Question;
}
