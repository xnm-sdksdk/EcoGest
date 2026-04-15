import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { User } from "./userEntity.js";
import { Questionnaire } from "./questionnaireEntity.js";
import { Answer } from "./answerEntity.js";

export enum QuestionType {
    TEXT = "text",
    SCALE = "scale",
    CHOICE = "choice",
}

@Entity()
export class Question extends BaseEntity {
    @Column({ type: "text" })
    value!: string;

    @Column({ type: "int" })
    order!: number;

    @Column({ type: "boolean", default: false })
    required!: boolean;

    @Column({ type: "enum", enum: QuestionType })
    type!: QuestionType;

    @ManyToOne(() => Questionnaire, questionnaire => questionnaire.questions)
    @JoinColumn({ name: "questionnaireId" })
    questionnaire!: Questionnaire;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "createdById" })
    createdBy!: User | null;

    @OneToMany(() => Answer, answer => answer.question)
    answers!: Answer[];
}
