import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class Level extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    minActivities!: number;

    @Column()
    minAreas!: number;

    @Column()
    order!: number;

    // TODO
    //projectId!: number;
}
