import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class User extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    school!: string;

    // TODO
    // @Column()
    // levelId!: number;

    // TODO
    // @Column()
    // activityId!: number;

    @Column()
    schoolYear!: number;

    @Column()
    state!: boolean;
}
