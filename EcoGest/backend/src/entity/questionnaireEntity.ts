import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Project } from "./projectEntity.js";
import { Question } from "./questionEntity.js";

@Entity()
export class Questionnaire extends BaseEntity {

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "text", nullable: true })
    description!: string | null;

    @Column({ type: "boolean", default: false })
    active!: boolean;

    @ManyToOne(() => Project, project => project.questionnaires)
    @JoinColumn({ name: "projectId" })
    project!: Project;

    @OneToMany(() => Question, question => question.questionnaire)
    questions!: Question[];

}