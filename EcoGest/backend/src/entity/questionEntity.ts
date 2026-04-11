import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

export enum QuestionType {
    TEXT = "text",
    SCALE = "scale",
    CHOICE = "choice",
}

@Entity()
export class Question extends BaseEntity {
    @Column()
    value!: string;

    // TODO
    // @Column()
    // questionnaireId!: number;

    @Column()
    createdBy!: string;

    @Column({ type: "enum", enum: QuestionType })
    type!: QuestionType;

    @Column()
    order!: number;

    @Column()
    required!: boolean;
}
