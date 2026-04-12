import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

@Entity()
export class Project extends BaseEntity {
    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    school!: string;

    // TODO
    // @Column()
    // levelId!: number;

    // TODO
    // @Column()
    // activityId!: number;

    // @Column()
    // schoolYear!: number;

    @Column({ type: "boolean", default: true })
    state!: boolean;
}
