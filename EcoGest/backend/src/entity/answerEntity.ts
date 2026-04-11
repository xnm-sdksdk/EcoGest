import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class User extends BaseEntity {
    @Column()
    value!: string;

    @Column()
    createdBy!: string;

    // TODO
    // @Column()
    // questionId!: number;
}
