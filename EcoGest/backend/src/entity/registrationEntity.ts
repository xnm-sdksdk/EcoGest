import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class Registration extends BaseEntity {
    @Column()
    name!: string;

    // TODO
    //activityId!: number;

    // TODO
    //userId!: number;
}
