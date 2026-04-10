import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class Execution extends BaseEntity {

    @Column()
    date!: Date;

    @Column()
    location!: string;

    @Column() //TODO
    createdBy!: string;

    // TODO
    //activityId!: number;

    // TODO
    //startedBy!: string;

    // TODO
    //photoId!: number;

    @Column()
    annotation!: string;
}