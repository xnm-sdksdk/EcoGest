import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class Scoring extends BaseEntity {
    @Column()
    points!: number;

    @Column()
    reason!: string;

    // TODO
    // @Column()
    // challengeId!: number;

    // TODO
    // @Column()
    // userId!: number;
}
